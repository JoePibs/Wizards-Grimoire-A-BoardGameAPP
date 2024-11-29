import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { RentService } from './rents.service';
import { Rent } from './rent.model';

@Controller('rents')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  // Créer un nouveau contrat de location
  @Post()
  async create(@Body() data: any): Promise<Rent> {
    return this.rentService.create(data);
  }

  // Trouver tous les contrats de location
  @Get()
  async findAll(): Promise<Rent[]> {
    return this.rentService.findAll();
  }

  // Trouver un contrat de location par ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Rent> {
    return this.rentService.findOne(+id);
  }

  // Mettre à jour un contrat de location
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<Rent> {
    return this.rentService.update(+id, data);
  }

  // Supprimer un contrat de location
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.rentService.remove(+id);
  }
}
