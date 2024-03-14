import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { generateUserId, hashPassword } from 'src/utils/crypt';
import bcrypt from 'bcrypt';
import { SigninRequestDto, SignupRequestDto } from './auth.dto';
import { UserRepository } from 'src/user/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userRepository.getUserByName(name);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid username or password');
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  async signin(signinDto: SigninRequestDto) {
    const user = await this.validateUser(
      signinDto.username,
      signinDto.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    return {
      user,
      access_token: this.jwtService.sign(user),
    };
  }

  async signup(user: SignupRequestDto) {
    const existingUser = await this.userService.getUserByUsername(
      user.username,
    );

    if (existingUser) {
      throw new ConflictException(`${user.username} already exists`);
    }

    const createdUser = await this.userRepository.createUser({
      id: generateUserId(),
      username: user.username,
      password: hashPassword(user.password),
    });

    const auth = this.signin({
      username: createdUser.username,
      password: createdUser.password,
    });

    if (!auth) {
      throw new UnauthorizedException('Singin failed after signup.');
    }

    return {
      user: {
        id: createdUser.id,
        username: createdUser.username,
      },
      auth,
    };
  }
}
