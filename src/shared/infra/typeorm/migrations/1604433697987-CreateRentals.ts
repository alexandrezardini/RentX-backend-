import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateRentals1604433697987 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'rentals',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'client_id',
            type: 'uuid',
          },
          {
            name: 'start_date',
            type: 'timestamp with time zone',
          },
          {
            name: 'end_date',
            type: 'timestamp with time zone',
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
      'rentals',
      new TableForeignKey({
        name: 'CarId',
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'cars',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'rentals',
      new TableForeignKey({
        name: 'ClientId',
        columnNames: ['client_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cars', 'CarId');
    await queryRunner.dropForeignKey('users', 'ClientId');

    await queryRunner.dropColumn('rentals', 'cars');
    await queryRunner.dropColumn('rentals', 'users');
  }
}
