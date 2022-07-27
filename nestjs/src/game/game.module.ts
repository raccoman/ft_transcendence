import { Module } from '@nestjs/common';
import GameGateway from 'src/game/game.gateway';
import { GameService } from 'src/game/game.service';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [GameGateway, GameService],
})
export class GameModule {
}
