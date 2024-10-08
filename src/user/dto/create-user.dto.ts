import { EUserRole } from '../enum/EUserRole';

export class CreateUserDto {
  email: string;
  password: string;
  role: EUserRole;
}
