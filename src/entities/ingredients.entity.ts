import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Ingredients extends Product {}
