import { ItemInMealDTO } from './item-in-meal.dto';
import { IsNumber } from 'class-validator';

export class MealDTO {
  id: number;

  token: string;

  @IsNumber()
  totalPrice: number;

  itemsInMeal: ItemInMealDTO[];
}