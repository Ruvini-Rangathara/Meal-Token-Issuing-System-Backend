// meal.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ItemInMeal } from './item-in-meal.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  token: string;

  @Column({ type: 'numeric' })
  totalPrice: number;

  @OneToMany(() => ItemInMeal, itemInMeal => itemInMeal.meal)
  itemsInMeal: ItemInMeal[];
}
