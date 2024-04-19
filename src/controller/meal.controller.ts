import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from '../entities/meal.entity';
import { Repository } from 'typeorm';
import { Response } from '../response/response';
import { MealService } from '../service/meal.service';

@Controller('meal')
export class MealController {
  constructor(
    private readonly mealService: MealService,
  ) {}


  @Get()
  async findAll(): Response{
    try{
      let mealDTO = await this.mealService.findAll();
      if (mealDTO.length > 0) {
        return new Response(HttpStatus.OK, "Meals found", mealDTO);
      } else {
        return new Response(HttpStatus.NO_CONTENT, "No meals found", []);
      }
    }catch (error) {
      console.error("Error getting meals:", error);
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, "Error getting meals", error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Response {
    try{
      let mealDTO = await this.mealService.findOne(id);
      if (mealDTO) {
        return new Response(HttpStatus.OK, "Meal found", mealDTO);
      } else {
        return new Response(HttpStatus.NO_CONTENT, "No meal found", []);
      }
    }catch (error) {
      console.error("Error getting meal:", error);
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, "Error getting meal", error);
    }
  }

  @Post()
  async create(@Body() mealData: Partial<Meal>): Response {
    try{
      if(await this.mealService.findOne(mealData.id)){
        return new Response(HttpStatus.CONFLICT, "Meal already exists", []);
      }
      let mealDTO = await this.mealService.create(mealData);
      return new Response(HttpStatus.CREATED, "Meal created", mealDTO);
    }catch (error) {
      console.error("Error creating meal:", error);
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating meal", error);
    }
  }


}

