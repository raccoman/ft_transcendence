import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Match, MatchState, MatchType, QueuedProfile } from 'types';
import { Server, Socket } from 'socket.io';
import * as cuid from 'cuid';

@Injectable()
export class GameService {

  private static CANVAS_WIDTH = 1024;
  private static CANVAS_HEIGHT = 576;
  private static CANVAS_PADDING_X = 20;

  private static PADDLE_HEIGHT = 192;
  private static PADDLE_WIDTH = 20;
  private static PADDLE_SPEED_Y = 300;

  private static BALL_RADIUS = 10;
  private static BALL_ACCELERATION = 100;

  private queues = new Map<MatchType, QueuedProfile[]>();
  private matches = new Map<string, Match>();

  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  public tickMatches(server: Server) {

    for (const match of this.matches.values()) {

      const timestamp = Date.now();
      match.timings.elapsed = timestamp - match.timings.started_at;

      for (const player of match.players) {

        const dirY = +player.input['ArrowDown'] - +player.input['ArrowUp'];
        player.paddle.posY += player.paddle.speedY * dirY;
        player.paddle.posY = Math.min(GameService.CANVAS_HEIGHT - GameService.PADDLE_HEIGHT, player.paddle.posY);
        player.paddle.posY = Math.max(0, player.paddle.posY);
      }

      match.ball.posX += match.ball.speedX;
      match.ball.posY += match.ball.speedY;

      if (match.ball.posY + match.ball.radius > GameService.CANVAS_HEIGHT ||
        match.ball.posY - match.ball.radius < 0) {
        match.ball.speedY += match.ball.acceleration;
        match.ball.speedY *= -1;
      }

      if (match.ball.posX + match.ball.radius > GameService.CANVAS_WIDTH ||
        match.ball.posX - match.ball.radius < 0) {
        match.ball.speedX += match.ball.acceleration;
        match.ball.speedX *= -1;
      }

      // const nearest = match.players[match.ball.posX < GameService.CANVAS_WIDTH / 2 ? 0 : 1];

      server.in(match.id).emit('MATCH-UPDATE', match);
    }
  }

  private tickQueue(server: Server, type: MatchType) {
    const queue = this.queues.get(type);

    console.debug('Ticking queue... (' + queue.length + '/' + 2 + ')');
    if (queue.length < 2)
      return;

    this.startGame(server, type, queue);
  }

  private startGame(server: Server, type: MatchType, queue: QueuedProfile[]) {

    const match: Match = {
      id: cuid(),
      players: [],
      spectators: [],
      ball: {
        radius: GameService.BALL_RADIUS,
        posY: GameService.CANVAS_HEIGHT / 2 - GameService.BALL_RADIUS,
        posX: GameService.CANVAS_WIDTH / 2 - GameService.BALL_RADIUS,
        speedX: 20,
        speedY: 6,
        acceleration: GameService.BALL_ACCELERATION,
      },
      settings: { lives: 5, type },
      state: MatchState.STARTING,
      timings: { started_at: Date.now(), elapsed: 0 },
    };

    for (let i = 0; i < queue.length; i++) {

      const queued = queue.at(i);

      match.players.push({
        profile: queued.profile,
        background: 'https://static.vecteezy.com/system/resources/previews/001/907/544/original/flat-design-background-with-abstract-pattern-free-vector.jpg',
        lives: match.settings.lives,
        input: {
          'ArrowDown': false,
          'ArrowUp': false,
        },
        paddle: {
          posY: GameService.CANVAS_HEIGHT / 2 - GameService.PADDLE_HEIGHT / 2,
          posX: i % 2 == 0 ? GameService.CANVAS_PADDING_X : GameService.CANVAS_WIDTH - GameService.PADDLE_WIDTH - GameService.CANVAS_PADDING_X,
          speedY: GameService.PADDLE_SPEED_Y,
          speedX: 0,
        },
      });

      queued.socket.join(match.id);
    }

    this.matches.set(match.id, match);
    server.in(match.id).emit('MATCH-FOUND', match);
    console.debug('Match (' + match.id + ') has been created.');
  }

  public async playerInput(id: number, match_id: string, key: string, pressed: boolean) {
    const match = this.matches.get(match_id);

    const index = match.players.findIndex(x => x.profile.id === id);
    if (index < 0)
      throw new Error('Cannot find player in this specific match.');

    match.players[index].input[key] = pressed;
  }

  public async enqueue(server: Server, client: Socket, id: number, type: MatchType) {

    const queue = this.queues.get(type) || [];

    for (let i = 0; i < queue.length; i++) {
      const queued = queue.at(i);
      if (queued.profile.id != id)
        continue;

      console.debug('ID: ' + id + ' already in queue...');

      if (queued.socket === client)
        return;

      queue[i].socket = client;
      console.debug('ID: ' + id + ' already in queue, but socket instance has changed.');
      return;
    }

    const profile = await this.prisma.profile.findUnique({
      where: {
        id,
      },
    });

    if (!profile)
      throw new Error('Profile was not found!');

    queue.push({ profile, socket: client });
    queue.push({ profile, socket: client }); //TODO: Remove after test
    this.queues.set(type, queue);
    console.debug('ID: ' + id + ' added to the queue.');

    this.tickQueue(server, type);
  }

  public async dequeue(server: Server, client: Socket, id: number) {

    for (const [type, queue] of this.queues.entries()) {

      for (let index = 0; index < queue.length; index++) {

        if (queue.at(index).profile.id != id)
          continue;

        queue.splice(index, 1);
        console.debug('ID: ' + id + ' removed from queue.');
        return;
      }
    }

    console.debug('ID: ' + id + ' wasn\'t in the queue.');
  }

}