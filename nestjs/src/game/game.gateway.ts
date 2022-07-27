import {
  ConnectedSocket,
  MessageBody, OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway, WebSocketServer,
} from '@nestjs/websockets';
import { Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Server, Socket } from 'socket.io';
import { GameService } from 'src/game/game.service';
import { MatchType } from 'types';
import { Interval } from '@nestjs/schedule';


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

  @Interval(50)
  private tickMatches() {
    this.gameService.tickMatches(this.server);
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('JOIN-QUEUE')
  async joinQueue(@Req() request, @MessageBody('type') type: MatchType, @ConnectedSocket() client: Socket): Promise<number> {
    try {

      const { user } = request;
      await this.gameService.enqueue(this.server, client, user.id, type);
      return 0;

    } catch (ex) {
      console.log(ex);
      return 1;
    }
  }

}