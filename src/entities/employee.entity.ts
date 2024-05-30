import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  emp_no: number;

  @Column({
    type: 'enum',
    enum: ['Mr', 'Mrs', 'Ms'],
  })
  title: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 15 })
  mobile: string;

  @Column({ length: 255 })
  address: string;

  @Column({ length: 12 })
  nic: string;

  @Column({
    type: 'enum',
    enum: ['ACTIVE', 'INACTIVE'],
  })
  status: string;

  @Column({ length: 100})
  picture: string;
}
