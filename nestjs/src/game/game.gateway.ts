import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import { Req, UseGuards, UsePipes } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Server, Socket } from 'socket.io';
import { GameService } from 'src/game/game.service';
import { MatchProfile, MatchType } from 'types';
import { Interval } from '@nestjs/schedule';
import { JoinQueueSchema, PlayerInputSchema } from 'src/game/schema';
import { JoiValidationPipe } from 'src/pipes/joi';


@WebSocketGateway(80, {
  cors: {
    origin: [process.env.NEXTJS_BASE_URL],
    credentials: true,
  },
  namespace: 'game',
})
export default class GameGateway implements OnGatewayDisconnect, OnGatewayConnection {

  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly gameService: GameService,
  ) {
  }

  handleDisconnect(client: any): any {
  }

  handleConnection(client: any, ...args): any {
  }

  /**
   * 1000ms / 60fps ≈ 16 milliseconds per frame
   * 1000ms / 30fps ≈ 33 milliseconds per frame
   *
   */
  @Interval(1000)
  private tickMatches() {
    this.gameService.tickMatches(this.server);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('JOIN-QUEUE')
  async joinQueue(@MessageBody(new JoiValidationPipe(JoinQueueSchema)) data, @Req() request, @ConnectedSocket() client: Socket): Promise<number> {
    try {

      const { user } = request;
      const { type } = data;
      await this.gameService.enqueue(this.server, client, user.id, type);
      return 0;

    } catch (ex) {
      console.log(ex);
      return 1;
    }
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('LEAVE-QUEUE')
  async leaveQueue(@Req() request, @ConnectedSocket() client: Socket): Promise<number> {
    try {

      const { user } = request;
      await this.gameService.dequeue(this.server, client, user.id);
      return 0;

    } catch (ex) {
      console.log(ex);
      return 1;
    }
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('PLAYER-INPUT')
  async playerInput(@MessageBody(new JoiValidationPipe(PlayerInputSchema)) data, @Req() request, @ConnectedSocket() client: Socket): Promise<number> {
    try {

      const { user } = request;
      const { match, key, pressed } = data;
      await this.gameService.playerInput(user.id, match, key, pressed);
      return 0;

    } catch (ex) {
      console.log(ex);
      return 1;
    }
  }

}