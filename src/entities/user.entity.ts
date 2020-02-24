import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ length: 50, unique: true })
  email?: string;

  @Column({ length: 30, unique: true })
  username?: string;

  @Column({ length: 30 })
  name?: string;

  @Column({ length: 50 })
  lastname?: string;

  @Column({ length: 250, nullable: false })
  password?: string;

  @Column({ default: false })
  isActive?: boolean;

  @Column({ default: false })
  profileImage?: string;

  @Column()
  activationToken?: string;
}
