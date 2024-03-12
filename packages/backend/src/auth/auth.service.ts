import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { generateUserId } from 'src/utils/generateId';
import bcrypt from 'bcrypt';
import { SigninRequestDto, SignupRequestDto } from './auth.dto';
import { UserRepository } from 'src/user/user.repository';
import { UserDto } from 'src/user/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(name: string, password: string): Promise<any> {
    const user = await this.userService.getUserByName(name);
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw new UnauthorizedException('Invalid username or password');
    }

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
    const existingUser = await this.userService.getUserByName(user.username);

    if (existingUser) {
      throw new ConflictException(`${user.username} already exists`);
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(user.password, salt);

    const createdUser = await this.userRepository.createUser({
      id: generateUserId(),
      username: user.username,
      password: hashedPassword,
    });
    const auth = this.signin({
      username: createdUser[0].username,
      password: createdUser[0].password,
    });
    return {
      user: createdUser,
      auth,
    };
  }

  private async generateToken(user: UserDto) {
    const payload = { username: user.username, sub: user.id };
    return {
      accessToken: this.jwtService.signAsync(payload),
    };
  }
}
