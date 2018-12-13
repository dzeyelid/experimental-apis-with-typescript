import { Test, TestingModule } from '@nestjs/testing';
import * as nanoid from 'nanoid';
import * as moment from 'moment';
import { BalancesController } from './balances.controller';
import { BalancesService } from './balances.service';
import { Balance } from './interfaces/balance.interface';
import { BalanceShowResponseBody } from './interfaces/balance-show-response-body.interface';
import { BalanceCreateRequestBody } from './interfaces/balance-create-request-body.interface';
import { BalanceCreateResponseBody } from './interfaces/balance-create-response-body.interface';

describe('BalancesController', () => {
  let balancesController: BalancesController;
  let balancesService: BalancesService;
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BalancesController],
      providers: [BalancesService],
    }).compile();

    balancesService = module.get<BalancesService>(BalancesService);
    balancesController = module.get<BalancesController>(BalancesController);
  });

  describe('create', () => {
    it('should pass parameters to BalancesService and return the result', async () => {
      const balance: Balance = createNewBalance({amount: 10});
      const param: BalanceCreateRequestBody = {
        balanceId: balance.id,
        amount: balance.amount
      };
      const expected: BalanceCreateResponseBody = {
        balance: balance
      };
      jest.spyOn(balancesService, 'create').mockImplementation(() => balance);
      expect(await balancesController.create(param)).toEqual(expected);
    });
  });

  describe('findAll', () => {
    it('should return an array of Balance interface', async () => {
      let result: Balance[] = [];
      result.push(createNewBalance());
      result.push(createNewBalance());
      jest.spyOn(balancesService, 'findAll').mockImplementation(() => result);
      expect(await balancesController.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return an object BalanceShowResponseBody', async () => {
      const balanceId = nanoid();
      const balance: Balance = createNewBalance({id: balanceId});
      const expected: BalanceShowResponseBody = { balance: balance };
      jest.spyOn(balancesService, 'findOne').mockImplementation(() => {
        return new Promise<Balance>((resolve) => resolve(balance))
      });
      expect(await balancesController.findOne(balanceId)).toEqual(expected);
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