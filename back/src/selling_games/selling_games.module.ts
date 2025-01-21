import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SellingGamesService } from './selling_games.service';
import { SellingGamesController } from './selling_games.controller';
import { SellingGame } from './selling_game.model';
import { User } from '../users/user.model';
import { Game } from '../games/game.model';
import { Condition } from '../conditions/condition.model';

@Module({
  imports: [SequelizeModule.forFeature([SellingGame, User, Game, Condition])],
  controllers: [SellingGamesController],
  providers: [SellingGamesService],
})
export class SellingGamesModule {}
