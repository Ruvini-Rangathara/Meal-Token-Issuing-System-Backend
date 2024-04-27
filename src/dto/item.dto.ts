import { IsNumber, IsString, Length } from 'class-validator';

export class ItemDTO {
  id: number;

  @IsNumber()
  price: number;

  @IsString({ message: 'Item name must be a string' })
  @Length(1, 150, { message: 'Name must be between 1 and 100 characters' })
  name: string;

  @IsString({ message: 'Token must be a string' })
  @Length(1, 200, { message: 'Token must be between 1 and 100 characters' })
  picture: string;
}