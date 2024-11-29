import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RentingGame } from './renting_game.model';
import { RentingGamesService } from './renting_games.service';
import { RentingGamesController } from './renting_games.controller';
import { Game } from '../games/game.model';
import { User } from '../users/user.model';
import { Condition } from '../conditions/condition.model';

@Module({
  imports: [SequelizeModule.forFeature([RentingGame, Game, User, Condition])],
  providers: [RentingGamesService],
  controllers: [RentingGamesController],
})
export class RentingGamesModule {}
