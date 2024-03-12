import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninRequestDto, SignupRequestDto } from './auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/auth/signin')
  async singin(@Body() body: SigninRequestDto) {
    return this.authService.signin(body);
  }

  @Post('/auth/signup')
  async signup(@Body() body: SignupRequestDto) {
    return this.authService.signup(body);
  }
}
