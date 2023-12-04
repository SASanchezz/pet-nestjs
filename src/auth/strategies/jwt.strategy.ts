import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new NotFoundException(`User #${payload.id} not found`);
    }
    if (!user.accessToken) {
      throw new UnauthorizedException('User has been logged out');
    }

    return user;
  }
}
