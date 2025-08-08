import {post, get, requestBody, param, inject} from '@loopback/rest';
import {User} from '../models/user.model';
import {UserRepository} from '../repositories/user.repository';
import {repository} from '@loopback/repository';
import {AuthService} from '../services/auth.service';

export class UserController {
  constructor(
    @repository(UserRepository)
    public userRepository: UserRepository,
    @inject('services.AuthService')
    protected authService: AuthService,
  ) {}

  @post('/users')
  async createUser(@requestBody() userData: Omit<User, 'id'>): Promise<User> {
    userData.password = await this.authService.hashPassword(userData.password);
    return this.userRepository.create(userData);
  }

  @get('/users/{id}')
  async findById(@param.path.string('id') id: string): Promise<User> {
    return this.userRepository.findById(id);
  }
}