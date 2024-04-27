import { Body, Controller, Get, HttpStatus, Param, Post } from '@nestjs/common';
import { MealService } from '../service/meal.service';
import { MealDTO } from '../dto/meal.dto';
import { Response } from '../response/response';

@Controller('meal')
export class MealController {
  constructor(
    private readonly mealService: MealService,
  ) {
  }


  @Get()
  async findAll(): Promise<Response> {
    try {
      let mealDTO = await this.mealService.findAll();
      if (mealDTO.length > 0) {
        return new Response(HttpStatus.OK, 'Meals found', mealDTO);
      } else {
        return new Response(HttpStatus.NO_CONTENT, 'No meals found', []);
      }
    } catch (error) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'Error getting meals', error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Response> {
    try {
      let findMealDTO = await this.mealService.findOne(id);
      if (findMealDTO) {
        return new Response(HttpStatus.OK, 'Meal found', findMealDTO);
      } else {
        return new Response(HttpStatus.NO_CONTENT, 'No meal found', []);
      }
    } catch (error) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'Error getting meal', error);
    }
  }

  @Post()
  async create(@Body() mealData: MealDTO): Promise<Response> {
    try {
      console.log('Received meal : ', mealData);
      let data = await this.mealService.create(mealData);

      console.log('Meal id : ', data[0].id, 'for item_in_meal : ', data[1]);
      let status: boolean = await this.mealService.updateMealId(data[0].id, data[1]);

      if (!status) {
        return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'Error updating item_in_meal', []);
      }

      return new Response(HttpStatus.CREATED, 'Meal created', data[0]);
    } catch (error) {
      return new Response(HttpStatus.INTERNAL_SERVER_ERROR, 'Error creating meal', null);
    }
  }


}

