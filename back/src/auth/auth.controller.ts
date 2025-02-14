import {
    Controller,
    Post,
    Body,
  } from '@nestjs/common';
  import { UsersService } from '../users/users.service';
  
  @Controller('auth') 
  export class AuthController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post('register')
    async register(@Body() createUserData: any): Promise<{ message: string; userId: number; pseudo: string; email: string; token: string }> {
      return this.usersService.createUser(createUserData);
    }
  
    @Post('login')
    async login(
      @Body() loginData: { email: string; password: string },
    ): Promise<{ token: string }> {
      const { email, password } = loginData;
      return this.usersService.login(email, password);
    }
  }
  