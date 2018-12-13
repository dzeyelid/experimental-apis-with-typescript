import { Controller, Get, Post, Param, Body, NotFoundException } from '@nestjs/common';
import { BalancesService } from './balances.service';
import { BalanceShowResponseBody } from './interfaces/balance-show-response-body.interface';
import { BalanceCreateResponseBody } from './interfaces/balance-create-response-body.interface';
import { Balance } from './entities/balance.entity';
import { BalanceCreateRequestBody } from './interfaces/balance-create-request-body.interface';

@Controller('balances')
export class BalancesController {
  constructor(private readonly balancesService: BalancesService) {}

  @Post()
  async create(@Body() balanceCreateRequestBody: BalanceCreateRequestBody): Promise<BalanceCreateResponseBody> {
    const balance: Balance = await this.balancesService.create(balanceCreateRequestBody);
    return { balance: balance };
  }

  @Get()
  async findAll(): Promise<Balance[]> {
    return await this.balancesService.findAll();
  }

  @Get(':balanceId')
  async findOne(@Param('balanceId') balanceId): Promise<BalanceShowResponseBody> {
    const balance: Balance = await this.balancesService.findOne(balanceId)
      .catch((err) => {
        throw new NotFoundException();
      });
    return { balance: balance };
  }
}
