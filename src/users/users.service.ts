import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User> {
    const user = this.userRepository.findOneBy({ email });
    if (!user) {
      throw new NotFoundException(`User #${email} not found`);
    }
    return user;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async create(email: string, plainPassword: string): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(plainPassword, saltOrRounds);
    const user = new User({ email, password: hashedPassword });
    await this.userRepository.save(user);

    return user;
  }

  async update(id: string, attrs: Partial<User>) {
    await this.userRepository.update(id, attrs);
  }
}
