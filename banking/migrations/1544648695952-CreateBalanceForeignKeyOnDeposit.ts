import {MigrationInterface, QueryRunner, TableForeignKey} from "typeorm";

export class CreateBalanceForeignKeyOnDeposit1544648695952 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createForeignKey("deposit", new TableForeignKey({
      columnNames: ["balanceId"],
      referencedColumnNames: ["id"],
      referencedTableName: "balance",
      onDelete: "CASCADE"
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable("deposit");
    const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf("balanceId") !== -1);
    await queryRunner.dropForeignKey("deposit", foreignKey);
  }

}
