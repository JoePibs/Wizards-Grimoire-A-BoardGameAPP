import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Condition } from './condition.model';

@Injectable()
export class ConditionsService {
  constructor(
    @InjectModel(Condition)
    private readonly ConditionModel: typeof Condition,
  ) {}

  // Méthode pour récupérer tous les utilisateurs
  async getAllConditions(): Promise<Condition[]> {
    return this.ConditionModel.findAll();
  }
  async getConditionById(id: number): Promise<Condition | null> {
    console.log('Searching for Condition with ID:', id); // Ajoutez un log pour confirmer que la méthode est appelée
    return this.ConditionModel.findByPk(id); // Vous pouvez également gérer le cas où l'utilisateur n'est pas trouvé
  }
}
