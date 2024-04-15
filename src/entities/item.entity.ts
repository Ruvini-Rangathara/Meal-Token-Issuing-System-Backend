import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  price: number;

  @Column({ length: 100})
  name: string;

  @Column({ length: 100})
  picture: string;

}