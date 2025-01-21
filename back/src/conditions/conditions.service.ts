import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Condition } from './condition.model';

@Injectable()
export class ConditionsService {
  constructor(
    @InjectModel(Condition)
    private readonly ConditionModel: typeof Condition,
  ) {}

  async getAllConditions(): Promise<Condition[]> {
    return this.ConditionModel.findAll();
  }
  async getConditionById(id: number): Promise<Condition | null> {
    const condition = await this.ConditionModel.findByPk(id);
    if (!condition) {
      throw new NotFoundException(`Condition with id ${id} not found`);
    }
    return condition;
  }
}
