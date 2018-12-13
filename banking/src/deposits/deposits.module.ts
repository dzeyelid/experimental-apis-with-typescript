import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Deposit } from "./entities/deposit.entity";
import { DepositsService } from "./deposits.service";
import { DepositsController } from "./deposits.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Deposit])],
  controllers: [DepositsController],
  providers: [DepositsService],
})
export class DepositsModule {}