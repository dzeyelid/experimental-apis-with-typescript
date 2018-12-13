import { Entity, Index, Column, CreateDateColumn, PrimaryColumn, BaseEntity } from "typeorm";
import { Deposit as DepositInterface } from "../interfaces/deposit.interface";

@Entity()
export class Deposit extends BaseEntity implements DepositInterface {

  @PrimaryColumn({ length: 128 })
  id: string;

  @Index()
  @Column()
  balanceId: string;

  @Column('int')
  amount: number;

  @CreateDateColumn()
  createdAt: Date;
}