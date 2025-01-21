import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { SellingGamesService } from './selling_games.service';
import { SellingGame } from './selling_game.model';

@Controller('selling-games')
export class SellingGamesController {
  constructor(private readonly sellingGamesService: SellingGamesService) {}

  // Créer un jeu en vente
  @Post()
  async create(@Body() data: any): Promise<SellingGame> {
    return this.sellingGamesService.create(data);
  }

  // Trouver tous les jeux en vente avec toutes les associations
  @Get()
  async findAll(): Promise<SellingGame[]> {
    return this.sellingGamesService.findAll();
  }

  // Trouver un jeu en vente par son ID avec toutes les associations
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SellingGame> {
    return this.sellingGamesService.findOne(+id);
  }

  // Mettre à jour un jeu en vente
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: any,
  ): Promise<SellingGame> {
    return this.sellingGamesService.update(+id, data);
  }

  // Supprimer un jeu en vente
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.sellingGamesService.remove(+id);
  }
}
