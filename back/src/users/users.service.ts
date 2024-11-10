import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
  ) {}

  // Méthode pour récupérer tous les utilisateurs
  async getAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }
  async getUserById(id: number): Promise<User | null> {
    console.log('Searching for user with ID:', id); // Ajoutez un log pour confirmer que la méthode est appelée
    return this.userModel.findByPk(id); // Vous pouvez également gérer le cas où l'utilisateur n'est pas trouvé
  }
}
