import { Controller, Post, Body, Get, Param, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { DepositsService } from './deposits.service';
import { DepositCreateRequestBody } from './interfaces/deposit-create-request-body.interface';
import { DepositCreateResponseBody } from './interfaces/deposit-create-response-body.interface';
import { DepositListResponseBody } from './interfaces/deposit-list-response-body.interface';
import { DepositShowResponseBody } from './interfaces/deposit-show-response-body.interface';
import { Deposit } from './entities/deposit.entity';

@Controller('deposits')
export class DepositsController {
  constructor(private readonly depositsService: DepositsService) {}

  @Post()
  async create(@Body() depositCreateRequestBody: DepositCreateRequestBody): Promise<DepositCreateResponseBody> {
    const deposit: Deposit = await this.depositsService.create(depositCreateRequestBody)
      .catch((err) => {
        throw new UnprocessableEntityException();
      });
    return { deposit: deposit };
  }

  @Get()
  async findAll(): Promise<DepositListResponseBody> {
    const deposits: Deposit[] = await this.depositsService.findAll();
    return { deposits: deposits };
  }

  @Get(':id')
  async findOne(@Param('id') id): Promise<DepositShowResponseBody> {
    const deposit: Deposit = await this.depositsService.findOne(id)
      .catch((err) => {
        throw new NotFoundException();
      });
    return { deposit: deposit };
  } 
}
