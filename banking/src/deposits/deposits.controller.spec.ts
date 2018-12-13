import { Test, TestingModule } from '@nestjs/testing';
import { DepositsController } from './deposits.controller';

describe('Deposits Controller', () => {
  let module: TestingModule;
  
  beforeAll(async () => {
    module = await Test.createTestingModule({
      controllers: [DepositsController],
    }).compile();
  });
  it('should be defined', () => {
    const controller: DepositsController = module.get<DepositsController>(DepositsController);
    expect(controller).toBeDefined();
  });
});
