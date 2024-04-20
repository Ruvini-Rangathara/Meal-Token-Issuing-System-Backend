import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { precision: 10, scale: 2 })
  price: number;

  @Column({ length: 100})
  name: string;

  @Column({ length: 100})
  picture: string;

}