import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemInMeal } from '../entities/item-in-meal.entity';
import { ItemInMealDTO } from '../dto/item-in-meal.dto';


export class ItemInMealService {
  constructor(
    @InjectRepository(ItemInMeal)
    private readonly itemInMealRepository: Repository<ItemInMeal>,
  ) {
  }

  async findAllByMealId( mealId : any): Promise<ItemInMealDTO[]> {
    try{
      console.log("Calling get all by meal id method in service")
      const items = await this.itemInMealRepository.find({ mealId: mealId });
      return items.map(item => new ItemInMealDTO(item));
    }catch (error) {
      console.error("Error getting items:", error);
      throw error;
    }
  }

  async create(itemInMealData: ItemInMealDTO[]): Promise<ItemInMealDTO[]> {
    try {
      console.log("Received request to create ItemInMeal in service layer");

      for(let itemData of itemInMealData){
        await this.itemInMealRepository.save(itemData);
      }
      console.log("ItemInMeal created. ")
      return itemInMealData;
    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  }

}