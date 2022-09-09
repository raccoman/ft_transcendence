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
import { MatchmakingService } from 'src/game/services/matchmaking.service';
import { Match, Partial } from 'types';
import { Profile } from 'types/graphql';
import { ProfileService } from 'src/profile/profile.service';
import { PrismaService } from 'src/prisma/prisma.service';


@WebSocketGateway(80, {
  cors: {
    origin: [process.env.NEXTJS_BASE_URL],
    credentials: true,
  },
  namespace: 'game',
})
export default class GameGateway implements OnGatewayDisconnect {

  @WebSocketServer()
  private server: Server;
  private sockets = new Map<string, Partial<Profile>>();

  constructor(
    private readonly prismaService: PrismaService,
    private readonly matchmakingService: MatchmakingService,
    private readonly gameService: GameService,
  ) {
  }

  handleDisconnect(socket: Socket): any {

    const profile = this.sockets.get(socket.id);
    if (!profile) {
      return;
    }

    this.matchmakingService.dequeue({ socket, id: profile.id });
    this.gameService.disconnect({ socket, id: profile.id });

    this.sockets.delete(socket.id);
  }

  @Interval(GameService.SERVER_TPS)
  private tickMatches() {
    this.gameService.tick(this.server);
  }

  @Interval(3000)
  private tickQueues() {
    this.matchmakingService.tick(this.server);
  }

  @UseGuards(Jwt2FAGuard)
  @SubscribeMessage('AUTHENTICATE')
  async authenticate(@Req() request, @ConnectedSocket() socket: Socket) {

    const { user: { id } } = request;

    const profile = await this.prismaService.profile.findUnique({
      select: {
        id: true,
        username: true,
        avatar: true,
        active_bg: true,
        backgrounds: true,
      },
      where: {
        id,
      },
    });
    if (!profile) {
      socket.disconnect(true);
      return;
    }

    this.sockets.set(socket.id, profile);
  }

  @UseGuards(Jwt2FAGuard)
  @SubscribeMessage('JOIN-QUEUE')
  async enqueue(@MessageBody(new JoiValidationPipe(JoinQueueSchema)) data, @Req() request, @ConnectedSocket() socket: Socket) {

    const { user: { id } } = request;
    const { type } = data;

    const profile = this.sockets.get(socket.id);
    if (!profile) {
      return;
    }

    return this.matchmakingService.enqueue({ socket, profile, type });
  }

  @UseGuards(Jwt2FAGuard)
  @SubscribeMessage('LEAVE-QUEUE')
  async dequeue(@Req() request, @ConnectedSocket() socket: Socket) {
    const { user: { id } } = request;
    return this.matchmakingService.dequeue({ socket, id });
  }

  @UseGuards(Jwt2FAGuard)
  @SubscribeMessage('MOVE-PADDLE')
  async move(@MessageBody(new JoiValidationPipe(PlayerInputSchema)) data, @Req() request, @ConnectedSocket() socket: Socket) {

    const { user: { id } } = request;
    const { match_id, key, pressed } = data;

    const profile = this.sockets.get(socket.id);
    if (!profile) {
      return;
    }

    this.gameService.move({ socket, profile, match_id, key, pressed });
  }

}