import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { UserProps } from 'src/user/entities/user.entity';
import { EUserRole } from 'src/user/enum/EUserRole';

export interface UserWithinPassword
  extends Omit<UserProps, 'password' | 'role'> {
  id: string;
  role: keyof typeof EUserRole;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: signInDto.email,
      },
    });

    if (user.password !== signInDto.password) {
      throw new UnauthorizedException({
        status: HttpStatus.UNAUTHORIZED,
        message: 'Email or password incorrect.',
      });
    }
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    } as UserWithinPassword;

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
