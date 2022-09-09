import { Injectable } from '@nestjs/common';
import {
  Ball,
  GameDisconnectInput,
  GameMoveInput,
  GameStartInput, GameStateInput,
  Match,
  MatchState,
  Paddle,
} from 'types';
import { Server } from 'socket.io';
import { MatchService } from './match.service';
import * as cuid from 'cuid';

@Injectable()
export class GameService {

  public static readonly SERVER_TPS = 15;

  private static readonly CANVAS_WIDTH = 1024;
  private static readonly CANVAS_HEIGHT = 576;
  private static readonly CANVAS_PADDING_X = 20;

  private static readonly PADDLE_HEIGHT = 192;
  private static readonly PADDLE_WIDTH = 20;
  private static readonly PADDLE_SPEED_Y = 10;

  private static readonly BALL_RADIUS = 10;
  private static readonly BALL_SPEED_X = 5;
  private static readonly BALL_ACCELERATION = 5;

  private readonly matches = new Map<string, Match>();
  private prevMatchTick = Date.now();

  constructor(
    private readonly matchService: MatchService,
  ) {
  }

  public disconnect({ socket, id }: GameDisconnectInput) {

    for (let [match_id, match] of this.matches.entries()) {

      const index = match.players.findIndex(x => x.profile.id === id || x.socket === socket);
      if (index < 0) {
        continue;
      }

      match.players[index].lives = 0;
      match.state = MatchState.ENDING;
      break;
    }

  }

  public tick(server: Server) {

    const current = Date.now();
    const partialTicks = (current - this.prevMatchTick) / GameService.SERVER_TPS;
    const partialSeconds = (current - this.prevMatchTick) / 1000;

    for (const match of this.matches.values()) {

      match.timings.elapsed = current - match.timings.started_at.getTime();

      switch (match.state) {

        case MatchState.STARTING: {
          this.starting({ match, partialTicks, partialSeconds });
          break;
        }

        case MatchState.RUNNING: {
          this.running({ match, partialTicks, partialSeconds });
          break;
        }

        case MatchState.ENDING: {
          this.ending({ match, partialTicks, partialSeconds });
          break;
        }

      }

      this.emit(server, 'MATCH-UPDATE', match);
    }

    this.prevMatchTick = current;
  }

  public move({ socket, profile, match_id, key, pressed }: GameMoveInput) {

    const match = this.matches.get(match_id);
    if (!match || match.state !== MatchState.RUNNING) {
      return;
    }

    const index = match.players.findIndex(x => x.profile.id === profile.id || x.socket === socket);
    if (index < 0) {
      return;
    }

    match.players[index].input[key] = pressed;
  }

  public start({ server, type, challengers }: GameStartInput) {

    const match: Match = {
      id: cuid(),
      players: challengers.map(({ socket, profile }, index) => ({
        socket,
        profile,
        background: process.env.NESTJS_BASE_URL + '/assets/background/' + (profile.active_bg < 0 ? 'default' : profile.backgrounds[profile.active_bg].id) + '.jpeg',
        lives: 5,
        input: {
          'ArrowDown': false,
          'ArrowUp': false,
          'ArrowRight': false,
          'ArrowLeft': false,
        },
        paddle: {
          posY: GameService.CANVAS_HEIGHT / 2 - GameService.PADDLE_HEIGHT / 2,
          posX: index % 2 == 0 ? GameService.CANVAS_PADDING_X : GameService.CANVAS_WIDTH - GameService.PADDLE_WIDTH - GameService.CANVAS_PADDING_X,
          speedY: GameService.PADDLE_SPEED_Y,
          speedX: 0,
        },
      })),
      ball: {
        radius: GameService.BALL_RADIUS,
        posY: GameService.CANVAS_HEIGHT / 2 - GameService.BALL_RADIUS,
        posX: GameService.CANVAS_WIDTH / 2 - GameService.BALL_RADIUS,
        speedX: GameService.BALL_SPEED_X * (Math.random() >= 0.5 ? 1 : -1),
        speedY: 0,
        acceleration: GameService.BALL_ACCELERATION,
      },
      settings: {
        lives: 5,
        type,
      },
      state: MatchState.STARTING,
      timings: {
        started_at: new Date(),
        elapsed: 0,
        countdown: 5,
      },
    };

    this.matches.set(match.id, match);

    match.players.forEach((x) => x.socket.join(match.id));
    this.emit(server, 'MATCH-FOUND', match);
  }

  private intersects(ball: Ball, paddle: Paddle) {

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

  private starting({ match, partialTicks, partialSeconds }: GameStateInput) {
    match.timings.countdown -= partialSeconds;

    if (Math.ceil(match.timings.countdown) >= 0) {
      return;
    }

    match.state = MatchState.RUNNING;
    match.timings.countdown = 3;
  }

  private running({ match, partialTicks, partialSeconds }: GameStateInput) {

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
      if (match.ball.acceleration < 30) {
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

  private ending({ match, partialTicks, partialSeconds }: GameStateInput) {
    this.matchService.upsert(match);

    match.players.forEach(x => x.socket.leave(match.id));
    this.matches.delete(match.id);
  }

  private emit(server: Server, event: string, match: Match) {

    const message = {
      ...match,
      players: [
        ...match.players
          .map(x => ({ ...x, socket: undefined })),
      ],
    };

    server.in(match.id).emit(event, message);
  }

}