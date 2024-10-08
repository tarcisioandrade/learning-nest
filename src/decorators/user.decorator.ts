import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserWithinPassword } from 'src/auth/auth.service';

export const User = createParamDecorator<keyof UserWithinPassword>(
  (data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
  },
);
