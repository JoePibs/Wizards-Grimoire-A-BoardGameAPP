import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/user.module';
import { User } from './users/user.model';
import { Condition } from './conditions/condition.model';
import { Illustrator } from './illustrators/illustrator.model';
import { ConditionsModule } from './conditions/conditions.module';
import { IllustratorsModule } from './illustrators/illustrators.module';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      models: [User, Condition, Illustrator],
    }),
    UsersModule,
    ConditionsModule,
    IllustratorsModule,

  ],
  providers: [],
})
export class AppModule {}
