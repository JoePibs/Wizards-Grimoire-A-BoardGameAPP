import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SellingGame } from './selling_game.model';
import { User } from '../users/user.model';
import { Game } from '../games/game.model';
import { Condition } from '../conditions/condition.model';

@Injectable()
export class SellingGamesService {
  constructor(
    @InjectModel(SellingGame)
    private readonly sellingGameModel: typeof SellingGame,
  ) {}

  // Créer un jeu en vente
  async create(data: any): Promise<SellingGame> {
    return this.sellingGameModel.create(data);
  }

  // Trouver tous les jeux en vente avec les associations
  async findAll(): Promise<SellingGame[]> {
    return this.sellingGameModel.findAll({
      include: [
        { model: User, as: 'owner' },
        { model: Game, as: 'game' },
        { model: Condition, as: 'condition' },
      ],
    });
  }

  // Trouver un jeu en vente par son ID avec les associations
  async findOne(id: number): Promise<SellingGame> {
    const sellingGame = await this.sellingGameModel.findByPk(id, {
      include: [
        { model: User, as: 'owner' },
        { model: Game, as: 'game' },
        { model: Condition, as: 'condition' },
      ],
    });
    if (sellingGame) {
      return sellingGame;
    }
    throw new Error('SellingGame not found');
  }

  // Mettre à jour un jeu en vente
  async update(id: number, data: any): Promise<SellingGame> {
    const game = await this.sellingGameModel.findByPk(id);
    if (game) {
      return game.update(data);
    }
    throw new Error('Game not found');
  }

  // Supprimer un jeu en vente
  async remove(id: number): Promise<void> {
    const game = await this.sellingGameModel.findByPk(id);
    if (game) {
      await game.destroy();
    } else {
      throw new Error('Game not found');
    }
  }
}
