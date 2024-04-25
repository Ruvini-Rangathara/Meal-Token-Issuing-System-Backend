import { IsNumber, IsString, Length } from 'class-validator';

export class ItemDTO {
  @IsNumber()
  id: number;

  @IsNumber()
  price: number;

  @IsString({ message: 'Item name must be a string' })
  @Length(1, 150, { message: 'Item name must be between 1 and 150 characters' })
  name: string;

  picture: string;
}