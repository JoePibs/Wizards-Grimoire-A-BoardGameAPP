import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly usersService: UsersService) {
    console.log('UsersService injecté dans JwtAuthGuard'); // Vérifie si l'injection fonctionne
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Authorization header manquant ou invalide',
      );
    }

    const token = authHeader.split(' ')[1];

    try {
      const user = await this.usersService.validateToken(token);
      if (!user) {
        throw new UnauthorizedException('Utilisateur non trouvé');
      }

      request.user = user;
      return true;
    } catch (err) {
      throw new UnauthorizedException(err.message || 'Accès non autorisé');
    }
  }
}
