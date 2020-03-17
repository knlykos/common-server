import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Ingredient extends Product {
  constructor() {
    super();
  }
}
