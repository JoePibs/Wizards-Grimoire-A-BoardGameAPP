// games.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './game.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('games')
//@UseGuards(JwtAuthGuard)
export class GamesController {
  constructor(private readonly gamesService: GamesService) {}

  // Créer un jeu
  @Post()
  async create(@Body() createGameBody: any): Promise<Game> {
    return this.gamesService.createGame(createGameBody); // Pas de validation avec DTO ici
  }

  // Récupérer tous les jeux
  @Get()
  async findAll(): Promise<Game[]> {

    return this.gamesService.getAllGames();
  }

  @Get('/fr')
  async findFrGames(): Promise<Game[]> {
    console.log('toto')
    return this.gamesService.getFrGames();
  }

  // Récupérer un jeu par ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Game> {
    return this.gamesService.getGameById(id);
  }

  // Mettre à jour un jeu
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateGameBody: any,
  ): Promise<Game> {
    return this.gamesService.updateGame(id, updateGameBody); // Pas de validation avec DTO ici
  }

  // Supprimer un jeu
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.gamesService.deleteGame(id);
  }
}
