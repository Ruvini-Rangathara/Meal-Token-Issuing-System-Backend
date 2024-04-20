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

    for (let itemInMealDto of mealDto.itemsInMeal) {
      let itemInMeal = new ItemInMeal();
      itemInMeal.id = itemInMealDto.id;
      itemInMeal.meal = meal;
      itemInMeal.item = itemInMealDto.item;
      itemInMeal.price = itemInMealDto.price;
      meal.itemsInMeal.push(itemInMeal);
    }
    return meal;
  }

  static convertToMealDTO(meal:Meal): MealDTO {
    let mealDto = new MealDTO();
    mealDto.id = meal.id;
    mealDto.token = meal.token;
    mealDto.totalPrice = meal.totalPrice;

    for (let itemInMeal of meal.itemsInMeal) {
      let itemInMealDto = new ItemInMealDTO();
      itemInMealDto.id = itemInMeal.id;
      itemInMealDto.meal = mealDto;
      itemInMealDto.item = itemInMeal.item;
      itemInMealDto.price = itemInMeal.price;
      mealDto.itemsInMeal.push(itemInMealDto);
    }
    return mealDto;
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