import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EUserRole } from 'src/user/enum/EUserRole';

type Role = keyof typeof EUserRole;

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get(Roles, context.getHandler());
    if (!role) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    return this.matchRole(role, user.role);
  }

  matchRole(routeRole: Role, userRole: EUserRole) {
    if (userRole === EUserRole.ADMIN) {
      return true;
    }
    return routeRole === userRole;
  }
}

export const Roles = Reflector.createDecorator<Role>();
