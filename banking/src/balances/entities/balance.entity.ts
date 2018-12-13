import { Entity, Column, CreateDateColumn, PrimaryColumn, BaseEntity } from 'typeorm';
import { Balance as BalanceInterface } from '../interfaces/balance.interface';

@Entity()
export class Balance extends BaseEntity implements BalanceInterface {

  @PrimaryColumn({ length: 128 })
  id: string;

  @Column('int')
  amount: number;

  @CreateDateColumn()
  createdAt: Date;
}
