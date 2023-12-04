import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from 'src/users/entities/user.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.getOrThrow('POSTGRES_HOST'),
  port: configService.getOrThrow('POSTGRES_PORT'),
  username: configService.getOrThrow('POSTGRES_USER'),
  password: configService.getOrThrow('POSTGRES_PASSWORD'),
  database: configService.getOrThrow('POSTGRES_DB'),
  entities: [User],
});
