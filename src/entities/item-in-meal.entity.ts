// item-in-meal.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Meal } from './meal.entity';
import { Item } from './item.entity';

@Entity()
export class ItemInMeal {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Meal, meal => meal.itemsInMeal)
  meal: Meal;

  @ManyToOne(() => Item)
  item: Item;

  @Column({ type: 'numeric', precision: 10, scale: 2 })
  price: number;
}
