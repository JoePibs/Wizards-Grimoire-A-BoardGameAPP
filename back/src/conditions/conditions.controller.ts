import { Controller, Get, Param } from '@nestjs/common';
import { ConditionsService } from './conditions.service';
import { Condition } from './condition.model';

@Controller('conditions') // La route sera accessible sous /users
export class ConditionsController {
  constructor(private readonly ConditionsService: ConditionsService) {}

  @Get() // Cette route récupère tous les utilisateurs
  async findAll(): Promise<Condition[]> {
    return this.ConditionsService.getAllConditions();
  }

  @Get(':id') // Cette route récupère un utilisateur spécifique par ID
  async findOne(@Param('id') id: number): Promise<Condition | null> {
    return this.ConditionsService.getConditionById(id);
  }
}
