import * as jwt from 'jsonwebtoken';
import { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'defaultSecretKey';

export function generateToken(
  payload: object,
  expiresIn: string = '1h',
): string {
  if (typeof JWT_SECRET !== 'string') {
    throw new Error('Le secret JWT n\'est pas défini correctement.');
  }

  // Vérifier que expiresIn est bien une chaîne de caractères
  if (typeof expiresIn !== 'string') {
    throw new Error('expiresIn doit être une chaîne de caractères');
  }
  const options: SignOptions = { expiresIn: expiresIn as SignOptions['expiresIn'] };
  return jwt.sign(payload, JWT_SECRET, options);
}

export function verifyToken(token: string): any {
  try {
    if (typeof JWT_SECRET !== 'string') {
      throw new Error('Le secret JWT n\'est pas défini correctement.');
    }

    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error('Token invalide ou expiré');
  }
}
