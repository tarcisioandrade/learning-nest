import { Body, Controller, Post } from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/common/set-public-route';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}
  @Post()
  @Public()
  async signIn(@Body() signInDto: SignInDto) {
    return await this.service.signIn(signInDto);
  }
}
