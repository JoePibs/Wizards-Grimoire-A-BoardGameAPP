import { Injectable } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(private sequelize: Sequelize) {}

  async onModuleInit() {
    try {
      await this.sequelize.authenticate();
      console.log('Connection to MySQL has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}