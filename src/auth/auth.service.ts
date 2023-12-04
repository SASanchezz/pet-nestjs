import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/users/users.service';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async signIn(user: User) {
    const payload = { id: user.id };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.getOrThrow('REFRESH_TOKEN_EXPIRES_IN'),
    });

    await this.usersService.update(user.id, { accessToken, refreshToken });

    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    const userExists = await this.usersService.findOneByEmail(email);
    if (!!userExists) {
      throw new ConflictException('User already exists');
    }
    const user = await this.usersService.create(email, password);
    const payload = { id: user.id };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.getOrThrow('REFRESH_TOKEN_EXPIRES_IN'),
    });

    await this.usersService.update(user.id, { accessToken, refreshToken });

    return {
      ...user,
      accessToken,
      refreshToken,
    };
  }

  async signOut(user: User): Promise<void> {
    await this.usersService.update(user.id, {
      accessToken: null,
      refreshToken: null,
    });
  }

  async refresh(user: User, refreshToken: string) {
    try {
      await this.jwtService.verifyAsync(refreshToken, {
        secret: this.configService.getOrThrow('JWT_SECRET_KEY'),
        ignoreExpiration: false,
      });
    } catch (e) {
      throw new ConflictException('Invalid refresh token');
    }

    const newPayload = { id: user.id };
    const newAccessToken = this.jwtService.sign(newPayload);
    const newRefreshToken = this.jwtService.sign(newPayload, {
      expiresIn: this.configService.getOrThrow('REFRESH_TOKEN_EXPIRES_IN'),
    });

    await this.usersService.update(user.id, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

    return {
      ...user,
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
