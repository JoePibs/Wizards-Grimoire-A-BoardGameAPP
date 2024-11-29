/// Mechanic.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Mechanic } from './mechanic.model';
import { CreateMechanicDto } from './dto/create-mechanic.dto';
import { UpdateMechanicDto } from './dto/update-mechanic.dto';

@Injectable()
export class MechanicsService {
  constructor(
    @InjectModel(Mechanic)
    private mechanicModel: typeof Mechanic,
  ) {}

  async create(createMechanicDto: CreateMechanicDto): Promise<Mechanic> {
    const { name } = createMechanicDto;
    return this.mechanicModel.create({ name } as Mechanic);
  }

  async findOne(id: number): Promise<Mechanic> {
    const mechanic = await this.mechanicModel.findByPk(id);
    if (!mechanic) {
      throw new NotFoundException(`Mechanic with id ${id} not found`);
    }
    return mechanic;
  }
  async findAll(): Promise<Mechanic[]> {
    return this.mechanicModel.findAll();
  }

  async update(
    id: number,
    updateMechanicDto: UpdateMechanicDto,
  ): Promise<[number, Mechanic[]]> {
    const mechanic = await this.mechanicModel.findByPk(id);
    if (!mechanic) {
      throw new NotFoundException(`Mechanic with ID ${id} not found`);
    }
    await mechanic.update(updateMechanicDto);
    return [1, [mechanic]];
  }

  async remove(id: number): Promise<void> {
    const mechanic = await this.findOne(id);
    if (mechanic) {
      await mechanic.destroy();
    }
  }
}
