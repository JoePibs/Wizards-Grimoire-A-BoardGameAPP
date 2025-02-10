import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
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

  async createUser(data: any): Promise<string> {
    
    const existingEmail = await this.userModel.findOne({ where: { email: data.email } });
    if (existingEmail) {
        throw new HttpException(`L'email ${data.email} existe déjà.`, HttpStatus.BAD_REQUEST);
    }
    
    const existingPseudo = await this.userModel.findOne({ where: { pseudo: data.pseudo } });
    if (existingPseudo) {
        throw new HttpException(`Le pseudo ${data.pseudo} est déjà utilisé.`, HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await hashPassword(data.password);

    const user = await this.userModel.create({
      ...data,
      password: hashedPassword,
    });

    return `L'utilisateur ${user.pseudo} a été créé avec succès`;
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

  async validateToken(token: string): Promise<Partial<User>> {
    try {
      const decoded = verifyToken(token) as { id: string }; 
      console.log(decoded);
      const userId = Number(decoded.id); // Convertir l'id en nombre
  
      if (isNaN(userId)) {
        throw new UnauthorizedException('ID utilisateur invalide dans le token');
      }
  
      const user = await this.userModel.findByPk(userId);
      if (!user) {
        throw new UnauthorizedException('Utilisateur non trouvé');
      }
      
      return user;
    } catch (err) {
      throw new UnauthorizedException('Token invalide');
    }
  }
  
  

  async getAllUsers(): Promise<Partial<User>[]> {
    return this.userModel.findAll({
        attributes: ['first_name','last_name','email', 'pseudo', 'city', 'role'],
    });
}


  async getUserById(id: number): Promise<Partial<User> | null> {
    return this.userModel.findByPk(id, {
        attributes: ['id','first_name','last_name','email', 'pseudo', 'city', 'role'] 
    });
  }

  async getProfile(userId: number): Promise<Partial<User>> {
    
    console.log('userId', userId);
    const user = await this.userModel.findByPk(userId, {
      attributes: ['id', 'first_name', 'last_name', 'email', 'pseudo', 'city', 'role'],
    });

    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }

    return user;
  }
}
