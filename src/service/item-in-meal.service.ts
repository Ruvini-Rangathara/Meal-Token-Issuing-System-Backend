import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemInMeal } from '../entities/item-in-meal.entity';
import { ItemInMealDTO } from '../dto/item-in-meal.dto';
import { Convertor } from '../util/convertor';
import { Injectable } from '@nestjs/common';
import { Item } from '../entities/item.entity';
import { Meal } from '../entities/meal.entity';


@Injectable()
export class ItemInMealService {
  constructor(
    @InjectRepository(ItemInMeal)
    private readonly itemInMealRepository: Repository<ItemInMeal>,
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {
  }

  async findAllByMealId( mealId : any): Promise<ItemInMealDTO[]> {
    try{
      console.log("Calling get all by meal id method in service")
      // let items = await this.itemInMealRepository.find({where:{meal:mealId}});
      // return items.map(item => Convertor.convertToItemInMealDTO(item));
      return null;
    }catch (error) {
      console.error("Error getting items:", error);
      throw error;
    }
  }

  // async create(itemInMealData: ItemInMealDTO[]): Promise<ItemInMealDTO[]> {
  //   try {
  //     console.log("Received request to create ItemInMeal in service layer");
  //
  //     for(let itemData of itemInMealData){
  //       let itemInMealData = Convertor.convertToItemInMeal(itemData);
  //       await this.itemInMealRepository.save(itemInMealData);
  //     }
  //     console.log("ItemInMeal created. ")
  //     return itemInMealData;
  //   } catch (error) {
  //     console.error("Error creating item:", error);
  //     throw error;
  //   }
  // }


  async create(itemInMealData): Promise<ItemInMealDTO[]> {
    try {
      console.log("Received request to create ItemInMeal in service layer : ", itemInMealData);

      for (let itemData of itemInMealData) {
        // Assuming itemData contains mealId and itemId properties
        const { mealId, itemId, price } = itemData;

        // Retrieve Meal and Item entities based on their IDs
        const meal = await this.mealRepository.query('SELECT * FROM meal WHERE id = $1', [mealId]);
        const item = await this.itemRepository.query('SELECT * FROM item WHERE id = $1', [itemId]);

        // Create a new ItemInMeal entity and assign the retrieved Meal and Item entities
        const newItemInMeal = new ItemInMeal();
        newItemInMeal.meal = meal;
        newItemInMeal.item = item;
        newItemInMeal.price = price;

        // Save the new ItemInMeal entity
        console.log()
        console.log("Saving new ItemInMeal entity: ", newItemInMeal)
        await this.itemInMealRepository.save(newItemInMeal);
      }

      console.log("ItemInMeal created. ");
      return itemInMealData;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  }

}