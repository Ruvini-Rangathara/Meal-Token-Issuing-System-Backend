import { MealDTO } from './meal.dto';
import { ItemDTO } from './item.dto';

export class ItemInMealDTO {
  id: number;
  meal: MealDTO;
  item: ItemDTO;
  price: number;
}