import { User } from '@prisma/client';
import { UserService } from '../user.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaService } from 'src/db/prisma.service';
import { EUserRole } from '../enum/EUserRole';

describe('User Controller Tests', () => {
  let userService: UserService;
  const prismaMock: DeepMockProxy<PrismaService> = mockDeep<PrismaService>();
  // let prismaMock: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    userService = new UserService(prismaMock);

    // Mock Method using @nest/testing package

    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [UserService, PrismaService],
    //   controllers: [UserController],
    // })
    //   .overrideProvider(PrismaService)
    //   .useValue(mockDeep<PrismaClient>())
    //   .compile();

    // userService = module.get(UserService);
    // prismaMock = module.get(PrismaService);
  });

  test('should search user with id and return it', async () => {
    const testUser: User = {
      id: 'oi',
      email: 'leldomeldo@gmail.com',
      password: '123456',
      role: EUserRole.ADMIN,
    };

    prismaMock.user.findUnique.mockResolvedValueOnce(testUser);
    const result = await userService.findOne(testUser.id);

    delete testUser.password;

    expect(result).toStrictEqual(testUser);
  });
});
