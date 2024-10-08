import { User } from '@prisma/client';
import { IMapper } from 'src/interfaces/IMapper';

export class UserMapper implements IMapper<User> {
  toResponse(props: User) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = props;
    return rest;
  }
}
