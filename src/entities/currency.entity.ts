import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 30, nullable: false })
  name?: string;

  @Column({ nullable: false })
  displayName?: string;

  @Column({ nullable: false })
  position?: number;

  @Column({ nullable: false })
  rate?: number;

  @Column({ nullable: false })
  rounding?: number;

  @Column({ nullable: false })
  decimalPlaces?: number;

  @Column({ nullable: false })
  currencyUnit?: number;

  @Column({ nullable: false, length: 20 })
  currencyUnitLabel?: string;

  @Column({ nullable: false, length: 5 })
  symbol: string;
}
