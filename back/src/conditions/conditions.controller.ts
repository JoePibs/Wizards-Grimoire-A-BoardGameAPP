import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ConditionsService } from './conditions.service';
import { Condition } from './condition.model';

@Controller('conditions')
export class ConditionsController {
  constructor(private readonly ConditionsService: ConditionsService) {}

  @Get()
  async findAll(): Promise<Condition[]> {
    return this.ConditionsService.getAllConditions();
  }

  @Get('unicorn/:id')
  async findOne(@Param('id') id: number): Promise<Condition | null> {
    const condition = await this.ConditionsService.getConditionById(id);
    if (!condition) {
      throw new NotFoundException(`Condition with id ${id} not found`);
    }
    return condition;
  }
}
