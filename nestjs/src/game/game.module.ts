import { Module } from '@nestjs/common';
import GameGateway from 'src/game/game.gateway';

@Module({
  providers: [GameGateway],
})
export class GameModule {
}
