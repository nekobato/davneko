import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './user.dto';
import { UserRepository } from './user.repository';
import { hashPassword } from 'src/utils/crypt';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  getUserByUsername(username: string) {
    return this.userRepository.getUserByName(username);
  }

  // createUser is at auth.service.ts

  updateUser(user: UpdateUserDto) {
    return this.userRepository.updateUser({
      id: user.id,
      username: user.username,
      password: user.password ? hashPassword(user.password) : undefined,
    });
  }
}
