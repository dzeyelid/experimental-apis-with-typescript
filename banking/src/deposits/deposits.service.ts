import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import * as nanoid from 'nanoid';
import { Deposit } from './entities/deposit.entity';
import { Balance } from '../balances/entities/balance.entity';
import { DepositCreateRequestBody } from './interfaces/deposit-create-request-body.interface';

@Injectable()
export class DepositsService {
  constructor(
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async create(depositCreateRequestBody: DepositCreateRequestBody): Promise<Deposit> {
    let balance = await Balance.findOneOrFail(depositCreateRequestBody.balanceId);
    
    let deposit = new Deposit();
    deposit.id = nanoid();
    deposit.balanceId = balance.id;
    deposit.amount = depositCreateRequestBody.amount;

    balance.amount += deposit.amount;
    await this.entityManager.save([balance, deposit]);

    return deposit;
  }

  async findAll(): Promise<Deposit[]> {
    return await Deposit.find();
  }

  async findOne(id: number | string): Promise<Deposit> {
    return await Deposit.findOneOrFail(id);
  }
}
