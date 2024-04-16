import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from '../entities/meal.entity';
import { Repository } from 'typeorm';

@Controller('meal')
export class MealController {
  constructor(
    @InjectRepository(Meal)
    private readonly mealRepository: Repository<Meal>,
  ) {}


  @Get()
  async findAll(): Promise<Meal[]> {
    try {
      console.log("Calling Get all method")
      let meals = await this.mealRepository.find();
      console.log("Meals : ",meals)
      return meals;
    } catch (error) {
      console.error("Error getting meals:", error);
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Meal> {
    try{
      console.log("Calling Get one method")
      let meal = await this.mealRepository.findOne(id);
      console.log("Meal : ",meal)
      return meal;
    }catch (error) {
      console.error("Error getting meal:", error);
      throw error;
    }
  }

  @Post()
  async create(@Body() mealData: Partial<Meal>): Promise<Meal> {
    try {
      console.log("Received request to create meal:", mealData);

      // Create a new instance of Meal with the provided data
      const newMeal = this.mealRepository.create(mealData);

      // Save the new meal to the database
      const savedMeal = await this.mealRepository.save(newMeal);

      console.log("Successfully created meal:", savedMeal);

      return savedMeal;
    } catch (error) {
      console.error("Error creating meal:", error);
      throw error; // Rethrow the error to be handled by NestJS exception filters
    }
  }

}

