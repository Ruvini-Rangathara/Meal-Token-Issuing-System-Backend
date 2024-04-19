import { ItemInMealDTO } from './item-in-meal.dto';

export class MealDTO {
  id: number;
  token: string;
  totalPrice: number;
  itemsInMeal: ItemInMealDTO[];
}