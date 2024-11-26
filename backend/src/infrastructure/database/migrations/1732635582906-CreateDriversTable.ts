import { MigrationInterface, QueryRunner, Table } from "typeorm";


export class CreateDriversTable1732635582906 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'drivers',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '100'
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'vehicle',
                    type: 'varchar',
                    length: '100'
                },
                {
                    name: 'review_rating',
                    type: 'varchar',
                    length: '1'
                },
                {
                    name: 'review_comment',
                    type: 'varchar',
                    length: '255'
                },
                {
                    name: 'rate_per_km',
                    type: 'int',
                },
                {
                    name: 'min_distance',
                    type: 'int',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('drivers')
    }

}
