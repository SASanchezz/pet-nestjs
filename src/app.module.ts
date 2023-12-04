import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { MyConfigModule } from './my-config/my-config.module';
import { MyWinstonModule } from './my-winston/my-winston.module';

@Module({
  imports: [
    MyConfigModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    MyConfigModule,
    MyWinstonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
