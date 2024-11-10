import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';

@Controller('users') // La route sera accessible sous /users
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // Cette route récupère tous les utilisateurs
  async findAll(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get(':id') // Cette route récupère un utilisateur spécifique par ID
  async findOne(@Param('id') id: number): Promise<User | null> {
    return this.usersService.getUserById(id);
  }
}
