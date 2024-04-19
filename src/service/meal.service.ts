import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from '../entities/meal.entity';
import {  Repository } from 'typeorm';
import { getManager } from "typeorm";
import { MealDTO } from '../dto/meal.dto';
import { Convertor } from '../util/convertor';
import { ItemInMealService } from './item-in-meal.service';

export class MealService{

  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
    private readonly itemInMealService: ItemInMealService,
  ) {
  }

  async findAll(): Promise<MealDTO[]> {
    try {
      console.log("Calling get all method in service")
      let items = await this.mealRepository.find();
      console.log("Find all items in service : ", items)
      return items.map(item => new MealDTO(item));
    } catch (error) {
      console.error("Error getting items:", error);
      throw error;
    }
  }

  async findOne(id: any): Promise<MealDTO> {
    try {
      console.log("Calling get one method in service")
      let meal = await this.mealRepository.findOne(id);
      console.log("Find one item in service : ", meal)
      return Convertor.convertToItemDTO(meal);
    } catch (error) {
      console.error("Error getting item:", error);
      throw error;
    }
  }

  async create(mealData: MealDTO): Promise<MealDTO> {
    const entityManager = getManager();
    try {
      console.log("Received request to create item in service : ", mealData);
      mealData.token = await this.generateToken();
      console.log("Generated token : ",mealData.token);

      // Start transaction
      await entityManager.transaction(async transactionalEntityManager => {
        // Create items in the meal
        for (let i = 0; i < mealData.itemsInMeal.length; i++) {
          await this.itemInMealService.create(mealData.itemsInMeal[i], transactionalEntityManager);
        }

        // Save meal
        let meal = await transactionalEntityManager.save(Convertor.convertToItem(mealData));
        console.log("Item created: ", meal);

        return mealData;
      });

    } catch (error) {
      console.error("Error creating item:", error);
      throw error;
    }
  }

  //generate token
  async generateToken(): Promise<string> {
    // generate token with today date and time and random number, start with EATO-
    //example : EATO-20210802-221
    // 20210802 is date and 221 is random number
    let token = "EATO-" + new Date().toISOString().split('T')[0].replace(/-/g,"") +"-"+ Math.floor(Math.random() * 1000);
    console.log("Generated token : ",token)
    return token;
  }

}