import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { CreateUserDto } from './user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  updateUser(id: string, user: CreateUserDto) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    return this.userRepository.updateUser(id, { ...user, password: hash });
  }

  getUserByName(name: string) {
    return this.userRepository.getUserByName(name);
  }
}
