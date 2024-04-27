import { MealDTO } from './meal.dto';
import { ItemDTO } from './item.dto';
import { IsNumber } from 'class-validator';

export class ItemInMealDTO {

  id: number;

  meal: MealDTO;

  item: ItemDTO;

  @IsNumber()
  price: number;
}