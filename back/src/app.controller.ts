import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { User } from './users/user.model';
import { Param } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly usersService: UsersService) {}

  @Get('users')
  async getUsers(): Promise<User[]> {
    return this.usersService.getAllUsers();
  }

  @Get('users/:id')
async getUserById(@Param('id') id: number): Promise<User | null> {
  console.log('User ID:', id); // Vérifiez si l'ID est correctement capté
  return this.usersService.getUserById(id);
}
}
