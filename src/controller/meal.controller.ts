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




}

