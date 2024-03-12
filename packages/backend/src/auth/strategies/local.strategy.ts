import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/auth/auth.service';
import { UserDto } from 'src/user/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, rawPassword: string): Promise<UserDto> {
    const user = this.authService.validateUser(email, rawPassword);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
