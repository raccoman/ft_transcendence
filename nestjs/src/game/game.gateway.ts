import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Context } from '@nestjs/graphql';


@WebSocketGateway(80, {
  cors: {
    origin: [process.env.NEXTJS_BASE_URL],
    credentials: true,
  }, namespace: 'game',
})
export default class GameGateway implements OnGatewayDisconnect {

  handleDisconnect(client: any): any {
  }

  @UseGuards(JwtAuthGuard)
  @SubscribeMessage('JOIN-QUEUE')
  async joinQueue(@Req() request, @MessageBody('mode') mode: 'RANKED' | 'UNRANKED'): Promise<number> {
    return 10;
  }

}