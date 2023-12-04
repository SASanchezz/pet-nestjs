import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false, length: 20 })
  email: string;

  @Column({ nullable: false, length: 255 })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true, default: null, length: 255 })
  @Exclude({ toPlainOnly: true })
  accessToken: string;

  @Column({ nullable: true, default: null, length: 255 })
  @Exclude({ toPlainOnly: true })
  refreshToken: string;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
