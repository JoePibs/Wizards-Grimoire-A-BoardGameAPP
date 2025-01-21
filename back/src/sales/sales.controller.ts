import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { Sale } from './sale.model';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  // Créer une vente
  @Post()
  async create(@Body() data: any): Promise<Sale> {
    return this.salesService.create(data);
  }

  // Trouver toutes les ventes
  @Get()
  async findAll(): Promise<Sale[]> {
    return this.salesService.findAll();
  }

  // Trouver une vente par ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Sale> {
    return this.salesService.findOne(+id);
  }

  // Mettre à jour une vente
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: any): Promise<Sale> {
    return this.salesService.update(+id, data);
  }

  // Supprimer une vente
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.salesService.remove(+id);
  }
}
