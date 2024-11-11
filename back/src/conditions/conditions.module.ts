import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Condition } from './condition.model';
import { ConditionsController } from './conditions.controller';
import { ConditionsService } from './conditions.service';

@Module({
  imports: [SequelizeModule.forFeature([Condition])],
  providers: [ConditionsService],
  controllers: [ConditionsController],
})
export class ConditionsModule {}
