import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getOrThrow('JWT_SECRET_KEY'),
        signOptions: {
          expiresIn: configService.getOrThrow('ACESS_TOKEN_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class MyJwtModule {}
