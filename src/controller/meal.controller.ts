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
  async findAll(): Promise<Meal[]> {

  }

  @Get(':id')
  async findOne(@Param('id') id: any): Promise<Meal> {

  }

  @Post()
  async create(@Body() mealData: Partial<Meal>): Promise<Meal> {

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

