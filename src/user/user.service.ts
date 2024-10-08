import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User as UserEntity } from './entities/user.entity';
import { UserMapper } from './entities/mapper';
import { PrismaService } from 'src/db/prisma.service';

@Injectable()
export class UserService {
  private _mapper = new UserMapper();

  constructor(private _prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { email, password, role } = createUserDto;
    const user = new UserEntity({ email, password, role }).toJSON();
    await this._prisma.user.create({ data: user });
  }

  findAll() {
    return `This action returns all user`;
  }

  async findOne(id: string) {
    const user = await this._prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user) {
      return this._mapper.toResponse(user);
    }
    return null;
  }
}
