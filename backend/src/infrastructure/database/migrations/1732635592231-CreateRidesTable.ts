import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRidesTable1732635592231 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'rides',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'customer_id',
                    type: 'varchar',
                    length: '100'
                },
                {
                    name: 'origin',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'destination',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'distance',
                    type: 'int'
                },
                {
                    name: 'duration',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'driver_id',
                    type: 'int',
                },
                {
                    name: 'value',
                    type: 'int'
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                    onUpdate: 'now()'
                }
            ]
        }));

        await queryRunner.createForeignKey('rides', new TableForeignKey({
            columnNames: ['driver_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'drivers',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('rides');
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes('driver_id'));
        if (foreignKey) {
            await queryRunner.dropForeignKey('rides', foreignKey);
        }

        await queryRunner.dropTable('rides');
    }
}
