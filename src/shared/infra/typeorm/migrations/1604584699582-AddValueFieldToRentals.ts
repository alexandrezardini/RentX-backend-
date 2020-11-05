import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddValueFieldToRentals1604584699582 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'rentals',
      new TableColumn({
        name: 'value',
        type: 'decimal',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('rentals', 'value');
  }
}
