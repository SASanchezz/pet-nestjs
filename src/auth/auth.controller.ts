import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RemovePasswordInterceptor } from 'src/utils/remove-password-interceptor';
import { RefreshDto } from './dto/refresh-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseInterceptors(RemovePasswordInterceptor)
  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  @HttpCode(HttpStatus.OK)
  async signIn(@Req() req) {
    return await this.authService.signIn(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('sign-out')
  @HttpCode(HttpStatus.OK)
  async signOut(@Req() req) {
    return await this.authService.signOut(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() refreshDto: RefreshDto, @Req() req) {
    return await this.authService.refresh(req.user, refreshDto.refreshToken);
  }
}
