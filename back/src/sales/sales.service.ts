import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Sale } from './sale.model';
import { SellingGame } from '../selling_games/selling_game.model';
import { User } from '../users/user.model';
import { Game } from '../games/game.model';

@Injectable()
export class SalesService {
  constructor(
    @InjectModel(Sale)
    private readonly saleModel: typeof Sale,
  ) {}

  // Créer une vente
  async create(data: any): Promise<Sale> {
    return this.saleModel.create(data);
  }

  // Trouver toutes les ventes
  async findAll(): Promise<Sale[]> {
    return this.saleModel.findAll({
      include: [
        {
          model: SellingGame,
          as: 'sellingGame',
          include: [
            { model: Game, as: 'game' }, // Détails du jeu
            {
              model: User,
              as: 'owner',
              attributes: ['id', 'first_name', 'last_name', 'bio'],
            }, // Détails du propriétaire
          ],
        },
        {
          model: User,
          as: 'buyer',
          attributes: ['id', 'first_name', 'last_name', 'bio'],
        }, // Détails de l'acheteur
      ],
    });
  }

  // Trouver une vente par ID
  async findOne(id: number): Promise<Sale> {
    const sale = await this.saleModel.findOne({
      where: { id },
      include: [
        {
          model: SellingGame,
          as: 'sellingGame',
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
          as: 'buyer',
          attributes: ['id', 'first_name', 'last_name', 'bio'],
        },
      ],
    });

    if (!sale) {
      throw new NotFoundException(`Sale with ID ${id} not found`);
    }
    return sale;
  }

  // Mettre à jour une vente
  async update(id: number, data: any): Promise<Sale> {
    const sale = await this.findOne(id);
    return sale.update(data);
  }

  // Supprimer une vente
  async remove(id: number): Promise<void> {
    const sale = await this.findOne(id);
    await sale.destroy();
  }
}
