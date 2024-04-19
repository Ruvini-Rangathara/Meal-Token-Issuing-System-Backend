import { MealDTO } from '../dto/meal.dto';
import { Meal } from '../entities/meal.entity';
import { ItemInMeal } from '../entities/item-in-meal.entity';
import { ItemInMealDTO } from '../dto/item-in-meal.dto';
import { Item } from '../entities/item.entity';
import { ItemDTO } from '../dto/item.dto';

export class Convertor{
  static convertToMeal(mealDto:MealDTO): Meal{
    let meal = new Meal();
    meal.id = mealDto.id;
    meal.token = mealDto.token;
    meal.totalPrice = mealDto.totalPrice;

    meal.itemsInMeal = mealDto.itemsInMeal.map(item => {
      return new ItemInMeal(item.id, item.meal, item.item, item.price);
    });
    return meal;
  }

  static convertToMealDTO(meal:Meal): MealDTO {
    let mealDto = new MealDTO();
    mealDto.id = meal.id;
    mealDto.token = meal.token;
    mealDto.totalPrice = meal.totalPrice;

    mealDto.itemsInMeal = meal.itemsInMeal.map(item => {
      return new ItemInMealDTO(item.id, item.meal, item.item, item.price);
    });
    return mealDto;
  }

  static convertToItemDTO(item:Item): ItemDTO {
    let itemDto = new ItemDTO();
    itemDto.id = item.id;
    itemDto.name = item.name;
    itemDto.price = item.price;
    return itemDto;
  }

  static convertToItem(itemDto:ItemDTO): Item {
    let item = new Item();
    item.id = itemDto.id;
    item.name = itemDto.name;
    item.price = itemDto.price;
    return item;
  }

  }