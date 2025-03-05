import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SingInDto } from './dto/singIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('singIn')
  validateUser(@Body() { username, password }: SingInDto) {
    return this.authService.signIn(username, password);
  }
}
