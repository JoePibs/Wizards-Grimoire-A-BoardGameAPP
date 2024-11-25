// games.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Game } from './game.model';
import { Editor } from '../editors/editor.model';
import { Illustrator } from '../illustrators/illustrator.model';
import { Mechanic } from '../mechanics/mechanic.model';
import { Theme } from '../themes/theme.model';

@Injectable()
export class GamesService {
  constructor(@InjectModel(Game) private readonly gameModel: typeof Game) {}

  // Créer un jeu
  async createGame(createGameBody: any): Promise<Game> {
    // Validation manuelle (si nécessaire)
    if (!createGameBody.name) {
      throw new Error('Name is required');
    }

    // Création du jeu dans la base de données
    const game = await this.gameModel.create(createGameBody);
    return game;
  }

  // Récupérer tous les jeux
  async getAllGames(): Promise<Game[]> {
    return this.gameModel.findAll();
  }

  // Récupérer un jeu par ID
  async getGameById(id: number): Promise<Game> {
    const game = await this.gameModel.findByPk(id, {
      include: [
        { model: Editor },
        { model: Illustrator },
        { model: Mechanic },
        { model: Theme },
      ],
    });
    if (!game) {
      throw new NotFoundException(`Game with ID ${id} not found`); // Lever une exception NotFoundException
    }
    return game;
  }

  // Mettre à jour un jeu
  async updateGame(id: number, updateGameBody: any): Promise<Game> {
    const game = await this.gameModel.findByPk(id);
    if (!game) {
      throw new Error('Game not found');
    }

    // Validation manuelle (si nécessaire)
    if (updateGameBody.price && isNaN(updateGameBody.price)) {
      throw new Error('Price must be a number');
    }

    // Mise à jour du jeu dans la base de données
    await game.update(updateGameBody);
    return game;
  }

  // Supprimer un jeu
  async deleteGame(id: number): Promise<void> {
    const game = await this.gameModel.findByPk(id);
    if (!game) {
      throw new Error('Game not found');
    }

    // Suppression du jeu dans la base de données
    await game.destroy();
  }
}
