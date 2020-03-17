import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 50, unique: true, nullable: false })
  code?: string;

  @Column({ length: 30, unique: true, nullable: false })
  barcode?: string;

  @Column({ length: 30, nullable: false })
  name?: string;

  @Column()
  description?: string;

  @Column()
  details?: string;

  @Column({ nullable: false })
  price?: number;

  @Column({ nullable: false })
  costPrice?: number;

  @Column({ default: true })
  isActive?: boolean;

  @Column({ default: '/no-image.png' })
  productImage?: string;

  @Column({ nullable: false })
  qtyAvailable?: number;

  @Column({ nullable: false })
  qtyOnHand: number;

  @Column()
  comments: string;

  @Column({ nullable: false })
  uam: number;

  @Column({ nullable: false })
  supplier: number;

  @Column({ nullable: false })
  currency: number;

  @Column({ nullable: false })
  priceList: number;
}
