import { Module } from '@nestjs/common';
import { RentController } from './rents.controller';
import { RentService } from './rents.service';
import { Rent } from './rent.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { RentingGame } from '../renting_games/renting_game.model';
import { User } from '../users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Rent, RentingGame, User])],
  controllers: [RentController],
  providers: [RentService],
})
export class RentsModule {}
