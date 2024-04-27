import { MealDTO } from '../dto/meal.dto';
import { Meal } from '../entities/meal.entity';
import { Item } from '../entities/item.entity';
import { ItemDTO } from '../dto/item.dto';

export class Convertor{

  static convertToMeal(mealDto:MealDTO): Meal{
    return {
      id: mealDto.id,
      token: mealDto.token,
      totalPrice: mealDto.totalPrice,
      itemsInMeal: []
    }
  }

  static convertToMealDTO(meal: Meal): MealDTO {
    return {
      id: meal.id,
      token: meal.token,
      totalPrice: meal.totalPrice,
      itemsInMeal: []
    };
  }

  static convertToItemDTO(item:Item): ItemDTO {
    let itemDto = new ItemDTO();
    itemDto.id = item.id;
    itemDto.name = item.name;
    itemDto.price = item.price;
    itemDto.picture = item.picture;
    return itemDto;
  }

  static convertToItem(itemDto:ItemDTO): Item {
    let item = new Item();
    item.id = itemDto.id;
    item.name = itemDto.name;
    item.price = itemDto.price;
    item.picture = itemDto.picture;
    return item;
  }

  }