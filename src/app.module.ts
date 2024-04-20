import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Meal } from './entities/meal.entity';
import { ItemInMeal } from './entities/item-in-meal.entity';
import { MealController } from './controller/meal.controller';
import { ItemController } from './controller/item.controller';
import { ItemService } from './service/item.service';
import { MealService } from './service/meal.service';
import { ItemInMealService } from './service/item-in-meal.service';

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
  controllers: [ItemController, MealController],
  providers:[ItemService, MealService, ItemInMealService],
})
export class AppModule {
  constructor() {
    console.log('Connected to the database successfully');
  }
}
