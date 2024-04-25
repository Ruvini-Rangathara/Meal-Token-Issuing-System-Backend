import { Body, Controller, Delete, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from '../entities/meal.entity';
import { Repository } from 'typeorm';
import { Response } from '../response/response';
import { MealService } from '../service/meal.service';
import { MealDTO } from '../dto/meal.dto';

@Controller('meal')
export class MealController {
  constructor(
    private readonly mealService: MealService,
  ) {}


  @Get()
  async findAll(): Promise<Response> {
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
  async findOne(@Param('id') id: any): Promise<Response>  {
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
  async create(@Body() mealData: MealDTO): Promise<Response>  {
    try{
      // if(await this.mealService.findOne(mealData.id)){
      //   return new Response(HttpStatus.CONFLICT, "Meal already exists", []);
      // }
      console.log("Received meal : ", mealData)
      let data = await this.mealService.create(mealData);
      // if(!mealDTO){
      //   return new Response(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating meal", []);
      // }

      // console.log("Meal created data in controller : ", data)

      console.log("Meal created meal id : ", data[0].id, " ============= ", data[1])
      if(await this.mealService.updateMealId(data[0].id, data[1])){
        return new Response(HttpStatus.CREATED, "Meal created", data);
      }else{
        return new Response(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating meal", []);
      }
    }catch (error) {
      console.error("Error creating meal:", error);
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, "Error creating meal", error);
    }
  }


}

