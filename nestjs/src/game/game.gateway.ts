import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import { Req, UseGuards } from '@nestjs/common';
import { Jwt2FAGuard } from 'src/auth/guards/jwt-2fa.guard';
import { Server, Socket } from 'socket.io';
import { GameService } from 'src/game/services/game.service';
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

  handleDisconnect(client: Socket): any {
    this.gameService.onDisconnect(client);
  }

  handleConnection(client: any, ...args): any {
  }

  @Interval(GameService.SERVER_TPS)
  private tickMatches() {
    this.gameService.tickMatches(this.server);
  }

  @Interval(3000)
  private tickQueues() {
    this.gameService.tickQueues(this.server);
  }

  @UseGuards(Jwt2FAGuard)
  @SubscribeMessage('JOIN-QUEUE')
  async joinQueue(@MessageBody(new JoiValidationPipe(JoinQueueSchema)) data, @Req() request, @ConnectedSocket() client: Socket): Promise<number> {
    try {

      const { user } = request;
      const { type } = data;
      await this.gameService.enqueue(client, user.id, type);
      return 0;

    } catch (ex) {
      console.log(ex);
      return 1;
    }
  }

  @UseGuards(Jwt2FAGuard)
  @SubscribeMessage('LEAVE-QUEUE')
  async leaveQueue(@Req() request, @ConnectedSocket() client: Socket): Promise<number> {
    try {

      const { user } = request;
      await this.gameService.dequeue(client, user.id);
      return 0;

    } catch (ex) {
      console.log(ex);
      return 1;
    }
  }

  @UseGuards(Jwt2FAGuard)
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