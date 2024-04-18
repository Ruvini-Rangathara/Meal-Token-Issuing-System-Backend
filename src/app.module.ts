import { HttpException, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemController } from './controller/item.controller';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { Meal } from './entities/meal.entity';
import { ItemInMeal } from './entities/item-in-meal.entity';
import { MealController } from './controller/meal.controller';
import { ItemInMealController } from './controller/item-in-meal.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'eato',
      entities: [Item, Meal, ItemInMeal],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Item, Meal, ItemInMeal]),
  ],
  controllers: [ItemController, MealController, ItemInMealController],
})
export class AppModule {
  constructor() {
    console.log('Connected to the database successfully');
  }
}
