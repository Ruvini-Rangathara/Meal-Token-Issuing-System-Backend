import { Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemInMeal } from '../entities/item-in-meal.entity';
import { Repository } from 'typeorm';

@Controller('item-in-meal')
export class ItemInMealController {
  constructor(
    @InjectRepository(ItemInMeal)
    private itemInMealRepository: Repository<ItemInMeal>,
  ) {}

  // Add a new item to a meal
  @Post()
  async addItemToMeal() {
    // Implement the logic to add an item to a meal

  }

  // view all items in a meal
  @Get(':mealId')
  async getItemsInMeal() {
    // Implement the logic to get all items in a meal

  }


}