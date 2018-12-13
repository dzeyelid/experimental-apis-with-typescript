import { Test, TestingModule } from '@nestjs/testing';
import * as nanoid from 'nanoid';
import * as moment from 'moment';
import { DepositsController } from './deposits.controller';
import { DepositsService } from './deposits.service';
import { Deposit } from './interfaces/deposit.interface';
import { DepositCreateRequestBody } from './interfaces/deposit-create-request-body.interface';
import { DepositCreateResponseBody } from './interfaces/deposit-create-response-body.interface';
import { DepositListResponseBody } from './interfaces/deposit-list-response-body.interface';
import { DepositShowResponseBody } from './interfaces/deposit-show-response-body.interface';
import { Balance } from '../balances/interfaces/balance.interface';

describe('Deposits Controller', () => {
  let depositsController: DepositsController;
  let depositsService: DepositsService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepositsController],
      providers: [DepositsService],
    }).compile();

    depositsController = module.get<DepositsController>(DepositsController);
    depositsService = module.get<DepositsService>(DepositsService);
  });

  describe('create', () => {
    it('should pass parameters to DepositsService and return the result', async () => {
      const balance: Balance = createNewBalance({amount: 10});
      const deposit: Deposit = createNewDeposit({
        balanceId: balance.id.toString(),
        amount: 3
      });
      const param: DepositCreateRequestBody = {
        balanceId: balance.id,
        amount: 5
      };
      const expected: DepositCreateResponseBody = {
        deposit: deposit
      };
      jest.spyOn(depositsService, 'create').mockImplementation(() => deposit);
      expect(await depositsController.create(param)).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should return an object DepositListResponseBody', async () => {
      let deposits: Deposit[] = [];
      deposits.push(createNewDeposit({balanceId: nanoid(), amount: 1}));
      deposits.push(createNewDeposit({balanceId: nanoid(), amount: 2}));
      const expected: DepositListResponseBody = {
        deposits: deposits
      }
      jest.spyOn(depositsService, 'findAll').mockImplementation(() => deposits);
      expect(await depositsController.findAll()).toEqual(expected);
    });
  });

  describe('findOne', () => {
    it('should return an object DepositShowResponseBody', async () => {
      const balance: Balance = createNewBalance({amount: 10});
      const deposit: Deposit = createNewDeposit({
        balanceId: balance.id.toString(),
        amount: 3
      });
      const expected: DepositShowResponseBody = {
        deposit: deposit
      };
      jest.spyOn(depositsService, 'findOne').mockImplementation(() => deposit);
      expect(await depositsController.findOne(deposit.id)).toEqual(expected);
    });
  });
});

const createNewBalance = (param: {id?: number | string, amount?: number} = {}): Balance => {
  return {
    id: param.id || nanoid(),
    amount: param.amount || 0,
    createdAt: moment().toDate()
  };
}

const createNewDeposit = (param: {balanceId: string, amount: number}): Deposit => {
  return {
    id: nanoid(),
    balanceId: param.balanceId,
    amount: param.amount,
    createdAt: moment().toDate()
  };
}