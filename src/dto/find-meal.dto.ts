import { FindItemInMealDTO } from './find-item-in-meal.dto';

export class FindMealDTO {
  id: number;
  token: string;
  totalPrice: number;

  findItemInMeal: FindItemInMealDTO[];

}