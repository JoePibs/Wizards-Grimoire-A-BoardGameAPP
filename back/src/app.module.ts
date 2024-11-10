import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/user.module';
import { User } from './users/user.model';  // Importation du module Users
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
      models: [User],
    }),
    UsersModule,  // Ajout du module Users
  ],
  providers: [],
})
export class AppModule {}
