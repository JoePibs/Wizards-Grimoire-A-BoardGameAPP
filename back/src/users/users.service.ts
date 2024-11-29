import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import { hashPassword, comparePasswords } from '../utils/hash-password';
import { generateToken, verifyToken } from '../utils/jwt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async createUser(data: any): Promise<User> {
    const hashedPassword = await hashPassword(data.password);

    const user = await this.userModel.create({
      ...data,
      password: hashedPassword,
    });

    return user;
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ where: { email } });
    if (!user || !(await comparePasswords(password, user.password))) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { token };
  }

  async validateToken(token: string): Promise<User> {
    try {
      const decoded = verifyToken(token) as { id: number };
      const user = await this.userModel.findByPk(decoded.id);

      if (!user) {
        throw new UnauthorizedException('Utilisateur non trouvé');
      }

      return user;
    } catch {
      throw new UnauthorizedException('Token invalide');
    }
  }

  async getAllUsers(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async getUserById(id: number): Promise<User | null> {
    return this.userModel.findByPk(id);
  }
}
