import { ItemInMealDTO } from './item-in-meal.dto';
import { IsNumber, IsString, Length, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class MealDTO {
  @IsNumber()
  id: number;

  @IsString({ message: 'Token must be a string' })
  @Length(1, 100, { message: 'Token must be between 1 and 100 characters' })
  token: string;

  @IsNumber()
  totalPrice: number;

  itemsInMeal: ItemInMealDTO[];
}