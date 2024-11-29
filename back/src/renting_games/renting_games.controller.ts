import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RentingGamesService } from './renting_games.service';

@Controller('renting-games')
export class RentingGamesController {
  constructor(private readonly rentingGamesService: RentingGamesService) {}

  @Post()
  async create(@Body() body: any) {
    return this.rentingGamesService.createRentingGame(body);
  }

  @Get()
  async findAll() {
    return this.rentingGamesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.rentingGamesService.findById(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: any) {
    return this.rentingGamesService.updateRentingGame(id, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.rentingGamesService.deleteRentingGame(id);
  }
}
