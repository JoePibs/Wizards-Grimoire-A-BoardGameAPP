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

  @Post()
  async create(
    @Body() createIllustratorDto: CreateIllustratorDto,
  ): Promise<Illustrator> {
    return this.illustratorsService.create(createIllustratorDto);
  }

  @Get()
  async findAll(): Promise<Illustrator[]> {
    return this.illustratorsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Illustrator> {
    return this.illustratorsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateIllustratorDto: UpdateIllustratorDto,
  ): Promise<[number, Illustrator[]]> {
    return this.illustratorsService.update(id, updateIllustratorDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.illustratorsService.remove(id);
  }
}
