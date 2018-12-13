import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DepositsModule } from './deposits/deposits.module';
import { BalancesModule } from './balances/balances.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({}),
    BalancesModule,
    DepositsModule,
  ],
})
export class AppModule {}
