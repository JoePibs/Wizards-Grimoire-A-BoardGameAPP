/// illustrator.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Illustrator } from './illustrator.model';
import { CreateIllustratorDto } from './dto/create-illustrator.dto';
import { UpdateIllustratorDto } from './dto/update-illustrator.dto';

@Injectable()
export class IllustratorsService {
  constructor(
    @InjectModel(Illustrator)
    private illustratorModel: typeof Illustrator,
  ) {}

  // Création d'un illustrateur
  async create(
    createIllustratorDto: CreateIllustratorDto,
  ): Promise<Illustrator> {
    const { name } = createIllustratorDto;
    return this.illustratorModel.create({ name } as Illustrator);
  }

  // Trouver un illustrateur par ID
  async findOne(id: number): Promise<Illustrator> {
    const illustrator = await this.illustratorModel.findByPk(id);
    if (!illustrator) {
      throw new NotFoundException(`Illustrator with id ${id} not found`);
    }
    return illustrator;
  }
  async findAll(): Promise<Illustrator[]> {
    return this.illustratorModel.findAll();
  }

  async update(
    id: number,
    updateIllustratorDto: UpdateIllustratorDto,
  ): Promise<[number, Illustrator[]]> {
    const illustrator = await this.illustratorModel.findByPk(id);
    if (!illustrator) {
      throw new NotFoundException(`Illustrator with ID ${id} not found`);
    }
    await illustrator.update(updateIllustratorDto);
    return [1, [illustrator]];
  }

  // Supprimer un illustrateur par ID
  async remove(id: number): Promise<void> {
    const illustrator = await this.findOne(id);
    if (illustrator) {
      await illustrator.destroy();
    }
  }
}
