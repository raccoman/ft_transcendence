import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Match, MatchProfile, MatchState, MatchType, QueuedProfile } from 'types';
import { Server, Socket } from 'socket.io';
import * as cuid from 'cuid';

@Injectable()
export class GameService {

  private static CANVAS_WIDTH = 1024;
  private static CANVAS_HEIGHT = 576;
  private static CANVAS_PADDING_X = 20;

  private static PADDLE_HEIGHT = 192;
  private static PADDLE_WIDTH = 20;
  private static PADDLE_SPEED_Y = 15;

  private static BALL_RADIUS = 10;
  private static BALL_SPEED_X = 10;
  private static BALL_ACCELERATION = 10;

  private queues = new Map<MatchType, QueuedProfile[]>();
  private matches = new Map<string, Match>();

  private prevMatchTick = Date.now();

  constructor(
    private readonly prisma: PrismaService,
  ) {
  }

  private intersects(ball: Match['ball'], paddle: MatchProfile['paddle']) {

    let testX = ball.posX;
    let testY = ball.posY;

    // which edge is closest? 1) test left edge
    if (ball.posX < paddle.posX)
      testX = paddle.posX;

    // 2) right edge
    else if (ball.posX > paddle.posX + GameService.PADDLE_WIDTH)
      testX = paddle.posX + GameService.PADDLE_WIDTH;

    // 3) top edge
    if (ball.posY < paddle.posY)
      testY = GameService.PADDLE_HEIGHT;

    // 4) bottom edge
    else if (ball.posY > paddle.posY + GameService.PADDLE_HEIGHT)
      testY = paddle.posY + GameService.PADDLE_HEIGHT;

    // get distance from the closest edges
    const distX = ball.posX - testX;
    const distY = ball.posY - testY;
    const distance = Math.sqrt((distX * distX) + (distY * distY));

    // if the distance is less than the radius, collision!
    return distance <= ball.radius;
  }

  private tickStartingMatch(match: Match, partialSeconds: number) {

    match.timings.countdown -= partialSeconds;

    if (Math.ceil(match.timings.countdown) < 0) {
      match.state = MatchState.RUNNING;
      match.timings.countdown = 3;
    }

  }

  private tickRunningMatch(match: Match, partialTicks: number) {

    for (const player of match.players) {
      const dirY = +player.input['ArrowDown'] - +player.input['ArrowUp'];
      player.paddle.posY += player.paddle.speedY * dirY * partialTicks;
      player.paddle.posY = Math.min(GameService.CANVAS_HEIGHT - GameService.PADDLE_HEIGHT, player.paddle.posY);
      player.paddle.posY = Math.max(0, player.paddle.posY);
    }

    match.ball.posX += match.ball.speedX * partialTicks;
    match.ball.posY += match.ball.speedY * partialTicks;

    if (match.ball.posY + match.ball.radius > GameService.CANVAS_HEIGHT) {
      match.ball.posY -= match.ball.radius;
      match.ball.speedY *= -1;
    }

    if (match.ball.posY - match.ball.radius < 0) {
      match.ball.posY += match.ball.radius;
      match.ball.speedY *= -1;
    }

    const nearest = match.players[match.ball.posX < GameService.CANVAS_WIDTH / 2 ? 0 : 1];
    if (this.intersects(match.ball, nearest.paddle)) {

      let collision = match.ball.posY - (nearest.paddle.posY + GameService.PADDLE_HEIGHT / 2);
      collision /= GameService.PADDLE_HEIGHT / 2;

      // calculate angle
      const angleRad = (collision * Math.PI) / 4;

      // calculate direction
      const direction = match.ball.posX < GameService.CANVAS_WIDTH / 2 ? 1 : -1;

      match.ball.speedX = direction * match.ball.acceleration * Math.cos(angleRad) * partialTicks;
      match.ball.speedY = match.ball.acceleration * Math.sin(angleRad) * partialTicks;

      // increase acceleration
      if (match.ball.acceleration < 20) {
        match.ball.acceleration += 0.5;
      }

    }

    if (match.ball.posX - match.ball.radius < 0 || match.ball.posX + match.ball.radius > GameService.CANVAS_WIDTH) {

      const loser = match.players[match.ball.posX < GameService.CANVAS_WIDTH / 2 ? 0 : 1];
      loser.lives--;

      match.state = loser.lives > 0 ? MatchState.STARTING : MatchState.ENDING;

      for (let i = 0; i < match.players.length; i++) {

        const { paddle } = match.players[i];

        paddle.posY = GameService.CANVAS_HEIGHT / 2 - GameService.PADDLE_HEIGHT / 2;
        paddle.posX = i % 2 == 0 ? GameService.CANVAS_PADDING_X : GameService.CANVAS_WIDTH - GameService.PADDLE_WIDTH - GameService.CANVAS_PADDING_X;
        paddle.speedY = GameService.PADDLE_SPEED_Y;
        paddle.speedX = 0;

      }

      match.ball.posY = GameService.CANVAS_HEIGHT / 2 - GameService.BALL_RADIUS;
      match.ball.posX = GameService.CANVAS_WIDTH / 2 - GameService.BALL_RADIUS;
      match.ball.speedX = GameService.BALL_SPEED_X * (Math.random() >= 0.5 ? 1 : -1);
      match.ball.speedY = 0;
      match.ball.acceleration = GameService.BALL_ACCELERATION;
    }
  }

  public tickMatches(server: Server) {

    const current = Date.now();
    const partialTicks = (current - this.prevMatchTick) / 50;
    const partialSeconds = (current - this.prevMatchTick) / 1000;

    for (const match of this.matches.values()) {

      match.timings.elapsed = current - match.timings.started_at;

      if (match.state == MatchState.STARTING) {
        this.tickStartingMatch(match, partialSeconds);
      }

      if (match.state == MatchState.RUNNING) {
        this.tickRunningMatch(match, partialTicks);
      }

      server.in(match.id).emit('MATCH-UPDATE', match);
    }

    this.prevMatchTick = current;
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
        speedX: GameService.BALL_SPEED_X * (Math.random() >= 0.5 ? 1 : -1),
        speedY: 0,
        acceleration: GameService.BALL_ACCELERATION,
      },
      settings: { lives: 5, type },
      state: MatchState.STARTING,
      timings: { started_at: Date.now(), elapsed: 0, countdown: 5 },
    };

    for (let i = 0; i < queue.length; i++) {

      const queued = queue.at(i);

      match.players.push({
        profile: queued.profile,
        lives: match.settings.lives,
        input: {
          'ArrowDown': false,
          'ArrowUp': false,
          'ArrowRight': false,
          'ArrowLeft': false,
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
  }

  public async playerInput(id: number, match_id: string, key: string, pressed: boolean) {

    const match = this.matches.get(match_id);
    if (!match || match.state != MatchState.RUNNING)
      return;

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