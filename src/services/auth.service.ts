import {injectable, BindingScope} from '@loopback/core';
import {UserRepository} from '../repositories/user.repository';
import {User} from '../models/user.model';
import {repository} from '@loopback/repository';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';

@injectable({scope: BindingScope.TRANSIENT})
export class AuthService {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
  ) {}

  async verifyCredentials(email: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({where: {email}});
    if (!user) {
      throw new Error('User not found');
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      throw new Error('Invalid password');
    }
    return user;
  }

  generateToken(userProfile: any): string {
    const token = jwt.sign(userProfile, process.env.JWT_SECRET || 'changeme', {
      expiresIn: '7d',
    });
    return token;
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }
}