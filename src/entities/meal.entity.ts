import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ItemInMeal } from './item-in-meal.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  token: string;

  @Column({type: 'numeric', precision: 10, scale: 2, nullable: true })
  totalPrice: number;

  @OneToMany(() => ItemInMeal, itemInMeal => itemInMeal.meal)
  itemsInMeal: ItemInMeal[];
}
