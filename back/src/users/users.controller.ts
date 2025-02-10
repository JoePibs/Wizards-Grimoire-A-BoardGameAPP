import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  NotFoundException,
  BadRequestException,
  UseGuards,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(): Promise<Partial<User>[]> {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Partial<User>> {
    const user = await this.usersService.getUserById(id);

    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} introuvable`);
    }

    return user;
  }

  @UseGuards(JwtAuthGuard)
@Post('profile')
async getProfile(@Req() request: any): Promise<Partial<User>> {
  const user = request.user;
  
  // Assurez-vous que l'ID est un nombre avant de l'envoyer
  const userId = Number(user.id); 

  if (isNaN(userId)) {
    throw new BadRequestException('ID utilisateur invalide');
  }

  return this.usersService.getProfile(userId);
}

}
