// illustrator.controller.ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { IllustratorsService } from './illustrators.service';
import { CreateIllustratorDto } from './dto/create-illustrator.dto';
import { UpdateIllustratorDto } from './dto/update-illustrator.dto';
import { Illustrator } from './illustrator.model';

@Controller('illustrators')
export class IllustratorsController {
  constructor(private readonly illustratorsService: IllustratorsService) {}

  // Endpoint pour créer un illustrateur
  @Post()
  async create(
    @Body() createIllustratorDto: CreateIllustratorDto,
  ): Promise<Illustrator> {
    return this.illustratorsService.create(createIllustratorDto);
  }

  // Endpoint pour récupérer tous les illustrateurs
  @Get()
  async findAll(): Promise<Illustrator[]> {
    return this.illustratorsService.findAll();
  }

  // Endpoint pour récupérer un illustrateur par ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Illustrator> {
    return this.illustratorsService.findOne(id);
  }

  // Endpoint pour mettre à jour un illustrateur par ID
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateIllustratorDto: UpdateIllustratorDto,
  ): Promise<[number, Illustrator[]]> {
    return this.illustratorsService.update(id, updateIllustratorDto);
  }

  // Endpoint pour supprimer un illustrateur par ID
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.illustratorsService.remove(id);
  }
}
