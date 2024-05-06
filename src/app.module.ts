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

@Module({
  imports: [
    TypeOrmModule.forRoot(

      {
      type: 'postgres',

      // port: 5432,
      // database: 'eato_0bo6',
      // host: 'dpg-coscdai1hbls73fi5ji0-a',
      // password: 'mBus4ghoBmrIAMIiNHFoS1xS2KNQZRcR',
      // username: 'root',
        url: 'postgres://root:mBus4ghoBmrIAMIiNHFoS1xS2KNQZRcR@dpg-coscdai1hbls73fi5ji0-a.oregon-postgres.render.com/eato_0bo6',

        // url: String(process.env.PG_URL),

        ssl: { rejectUnauthorized: false },

        entities: [Item, Meal, ItemInMeal],
      synchronize: true,
        logging: true,
    }
    ),
    TypeOrmModule.forFeature([Item, Meal, ItemInMeal]),
  ],
  controllers: [ItemController, MealController],
  providers:[ItemService, MealService],
})
export class AppModule {
  constructor() {
    console.log('Connected to the database successfully');
  }
}
