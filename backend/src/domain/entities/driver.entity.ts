import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from "typeorm";

@Entity('drivers')
export class DriverEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        name: 'name',
        length: 100
    })
    name: string;

    @Column({
        type: 'varchar',
        name: 'description',
        length: 255
    })
    description: string;

    @Column({
        type: 'varchar',
        name: 'vehicle',
        length: 100
    })
    vehicle: string;

    @Column({
        type: 'varchar',
        name: 'review_rating',
        length: 1
    })
    review_rating: string;

    @Column({
        type: 'varchar',
        name: 'review_comment',
        length: 255
    })
    review_comment: string;

    @Column({
        type: 'int',
        name: 'rate_per_km',
    })
    rate_per_km: number;

    @Column({
        type: 'int',
        name: 'min_distance',
    })
    min_distance: number;

    @Column({
        type: 'timestamp',
        name: 'created_at',
    })
    created_at: Date

    @Column({
        type: 'timestamp',
        name: 'updated_at',
    })
    updated_at: Date
}