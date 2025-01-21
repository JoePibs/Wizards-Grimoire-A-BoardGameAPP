import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Rent } from './rent.model';
import { RentingGame } from '../renting_games/renting_game.model';
import { User } from '../users/user.model';
import { Game } from '../games/game.model';

@Injectable()
export class RentService {
  constructor(
    @InjectModel(Rent)
    private readonly rentModel: typeof Rent,
  ) {}

  // Créer un nouveau contrat de location
  async create(data: any): Promise<Rent> {
    return this.rentModel.create(data);
  }

  // Trouver tous les contrats de location
  async findAll(): Promise<Rent[]> {
    return this.rentModel.findAll({
      include: [
        {
          model: RentingGame,
          include: [
            { model: Game, as: 'game' },
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'first_name', 'last_name', 'bio'],
            },
          ],
        },
        {
          model: User,
          as: 'renter',
          attributes: ['id', 'first_name', 'last_name', 'bio'],
        },
      ],
    });
  }

  // Trouver un contrat de location par ID
  async findOne(id: number): Promise<Rent> {
    const rent = await this.rentModel.findByPk(id);
    if (!rent) {
      throw new Error('Rent not found');
    }
    return rent;
  }

  // Mettre à jour un contrat de location
  async update(id: number, data: any): Promise<Rent> {
    const rent = await this.rentModel.findByPk(id);
    if (rent) {
      return rent.update(data);
    }
    throw new Error('Rent not found');
  }

  // Supprimer un contrat de location
  async remove(id: number): Promise<void> {
    const rent = await this.rentModel.findByPk(id);
    if (rent) {
      await rent.destroy();
    } else {
      throw new Error('Rent not found');
    }
  }
}
