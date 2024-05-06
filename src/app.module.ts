import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Meal } from './entities/meal.entity';
import { ItemInMeal } from './entities/item-in-meal.entity';
import { MealController } from './controller/meal.controller';
import { ItemController } from './controller/item.controller';
import { ItemService } from './service/item.service';
import { MealService } from './service/meal.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env', isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      username: process.env.DATABASE_USER,
      password: String(process.env.DATABASE_PASSWORD),
      database: process.env.DATABASE_NAME,
      ssl: {
        rejectUnauthorized: false
      },
      entities: [Item, Meal, ItemInMeal],
      synchronize: true,
      logging: true,
  }),
    TypeOrmModule.forFeature([Item, Meal, ItemInMeal])],
  controllers: [ItemController, MealController],
  providers: [ItemService, MealService],
})

export class AppModule {
  constructor() {
    console.log('Connected to the database successfully');
  }
}
