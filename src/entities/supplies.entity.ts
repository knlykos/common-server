import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
} from 'typeorm';
import { Food } from './food.entity';
import { Product } from './product.entity';

@Entity()
export class Supplies {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(
    type => Food,
    food => food.supplies,
  )
  food?: number;

  @ManyToOne(
    type => Product,
    product => product.id,
  )
  product?: number;

  @Column()
  type?: number;
}
