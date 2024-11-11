// illustrator.module.ts
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { IllustratorsService } from './illustrators.service';
import { IllustratorsController } from './illustrators.controller';
import { Illustrator } from './illustrator.model';

@Module({
  imports: [SequelizeModule.forFeature([Illustrator])],
  controllers: [IllustratorsController],
  providers: [IllustratorsService],
})
export class IllustratorsModule {}
