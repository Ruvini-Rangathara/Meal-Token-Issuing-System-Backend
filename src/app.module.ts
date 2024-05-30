import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Meal } from './entities/meal.entity';
import { ItemInMeal } from './entities/item-in-meal.entity';
import { MealController } from './controller/meal.controller';
import { ItemController } from './controller/item.controller';
import { ItemService } from './service/item.service';
import { MealService } from './service/meal.service';
import * as process from 'node:process';
import { ConfigModule } from '@nestjs/config';
import { Employee } from './entities/employee.entity';
import { EmployeeController } from './controller/employee.controller';
import { EmployeeService } from './service/employee.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', isGlobal: true,
    }),
    TypeOrmModule.forRoot(
      {
      type: 'postgres',
        url: String(process.env.PG_URL),
        ssl: { rejectUnauthorized: false },
        entities: [Item, Meal, ItemInMeal, Employee],
      synchronize: true,
        logging: true,
    }
    ),
    TypeOrmModule.forFeature([Item, Meal, ItemInMeal, Employee]),
  ],
  controllers: [ItemController, MealController, EmployeeController],
  providers:[ItemService, MealService, EmployeeService],
})
export class AppModule {
  constructor() {
    console.log('Connected to the database successfully');
  }
}
