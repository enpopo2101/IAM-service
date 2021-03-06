import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('/login')
  async login(@Body() data: AuthDto) {
    const token = await this.authService.login(data);
    return { token };
  }

  @Post('/register')
  async register(@Body() data: AuthDto) {
    return await this.authService.register(data);
  }
}
