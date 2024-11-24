import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { DriverEntity } from "./driver.entity";

@Entity('rides')
export class RideEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'varchar',
        name: 'customer_id',
        length: 100
    })
    customer_id: string;

    @Column({
        type: 'varchar',
        name: 'origin',
        length: 255
    })
    origin: string;

    @Column({
        type: 'varchar',
        name: 'destination',
        length: 255
    })
    destination: string;

    @Column({
        type: 'int',
        name: 'distance',
    })
    distance: number;

    @Column({
        type: 'varchar',
        name: 'duration',
        length: 255
    })
    duration: string;

    @Column({
        type: 'int',
        name: 'driver_id'
    })
    driver_id: number;

    @ManyToOne(() => DriverEntity)
    @JoinColumn({ name: 'driver_id' })
    driver: DriverEntity;

    @Column({
        type: 'int',
        name: 'value',
    })
    value: number;

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
