import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SalesController } from './sales.controller';
import { SalesService } from './sales.service';
import { Sale } from './sale.model';
import { SellingGame } from '../selling_games/selling_game.model';
import { User } from '../users/user.model';

@Module({
  imports: [SequelizeModule.forFeature([Sale, SellingGame, User])],
  controllers: [SalesController],
  providers: [SalesService],
})
export class SalesModule {}
