import { IsNotEmpty, IsUUID } from 'class-validator';

export class FindOneDto {
  @IsNotEmpty()
  @IsUUID(4)
  id: string;
}
