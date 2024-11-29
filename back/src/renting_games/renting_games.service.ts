import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RentingGame } from './renting_game.model';
import { Game } from '../games/game.model';
import { User } from '../users/user.model';

@Injectable()
export class RentingGamesService {
  constructor(
    @InjectModel(RentingGame)
    private rentingGameModel: typeof RentingGame,
  ) {}

  async createRentingGame(data: any): Promise<RentingGame> {
    return this.rentingGameModel.create(data);
  }

  async findAll(): Promise<RentingGame[]> {
    return this.rentingGameModel.findAll({
      include: [
        { model: Game, as: 'game' },
        {
          model: User,
          as: 'owner',
          attributes: ['first_name', 'last_name', 'city', 'bio'],
        },
      ],
    });
  }

  async findById(id: number): Promise<RentingGame> {
    const rentingGame = await this.rentingGameModel.findByPk(id);
    if (!rentingGame) {
      throw new Error(`RentingGame with id ${id} not found`);
    }
    return rentingGame;
  }

  async updateRentingGame(id: number, data: any): Promise<[number]> {
    return this.rentingGameModel.update(data, {
      where: { id },
    });
  }

  async deleteRentingGame(id: number): Promise<void> {
    const rentingGame = await this.rentingGameModel.findByPk(id);
    if (rentingGame) {
      await rentingGame.destroy();
    }
  }
}
