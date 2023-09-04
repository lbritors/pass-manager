import { UsersService } from 'src/users/users.service';
import { AuthService } from './../auth/auth.service';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly authService: AuthService,
  private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const { authorization } = request.headers;
    
    try {
      const data = this.authService.verifyToken((authorization ?? "").split(" ")[1]);
      const user = await this.usersService.findOne(data.id);
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}