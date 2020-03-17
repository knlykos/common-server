import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Product } from './product.entity';
import { Ingredient } from './ingredient.entity';
import { Supplies } from './supplies.entity';

@Entity()
export class Food extends Product {
  @OneToMany(
    type => Supplies,
    supplies => supplies.food,
  )
  Ingredients: Product[];

  @Column()
  preparationTime: number;

  @OneToMany(
    type => Supplies,
    supplies => supplies.food,
  )
  supplies?: number;
  constructor() {
    super();
  }
}
