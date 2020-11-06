import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Rental from '@modules/rentals/infra/typeorm/entities/Rental';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  rental_id: string;

  @ManyToOne(() => Rental)
  @JoinColumn({ name: 'rental_id' })
  rental: Rental;

  @Column()
  transaction_id: string;

  @Column()
  status: string;

  @Column()
  authorization_code: string;

  @Column()
  brand: string;

  @Column()
  authorized_amount: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
