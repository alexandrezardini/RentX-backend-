import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTransaction1604611211191 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'rental_id',
            type: 'uuid',
          },
          {
            name: 'transaction_id',
            type: 'uuid',
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'authorization_code',
            type: 'varchar',
          },
          {
            name: 'brand',
            type: 'varchar',
          },
          {
            name: 'authorized_amount',
            type: 'integer',
          },
          {
            name: 'tid',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        name: 'RentalId',
        columnNames: ['rental_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'rentals',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('transactions', 'RentalId');

    await queryRunner.dropColumn('transactions', 'rentals');
  }
}
