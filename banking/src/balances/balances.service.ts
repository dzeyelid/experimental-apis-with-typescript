import { Injectable } from '@nestjs/common';
import * as nanoid from 'nanoid';
import { Balance } from './entities/balance.entity';
import { BalanceCreateRequestBody } from './interfaces/balance-create-request-body.interface';

@Injectable()
export class BalancesService {

    async create(balanceCreateRequestBody: BalanceCreateRequestBody): Promise<Balance> {
    let balance = new Balance();
    balance.id = balanceCreateRequestBody.balanceId || nanoid();
    balance.amount = balanceCreateRequestBody.amount || 0;
    return balance.save();
  }

  async findAll(): Promise<Balance[]> {
    return await Balance.find();
  }

  async findOne(balanceId: number | string): Promise<Balance> {
    return await Balance.findOneOrFail(balanceId);
  }
}
