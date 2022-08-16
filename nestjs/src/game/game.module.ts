import { Module } from '@nestjs/common';
import GameGateway from 'src/game/game.gateway';
import { GameService } from 'src/game/services/game.service';
import { ScheduleModule } from '@nestjs/schedule';
import { MatchService } from 'src/game/services/match.service';
import { MatchResolver } from 'src/game/resolvers/match.resolver';
import { ProfileService } from 'src/profile/profile.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [GameGateway, GameService, MatchService, MatchResolver, ProfileService],
})
export class GameModule {
}
