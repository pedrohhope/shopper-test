import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from '../../domain/entities/driver.entity';
import DriverRepository from '../repositories/driver.repository';
import RideRepository from '../repositories/ride.repository';
import { RideEntity } from 'src/domain/entities/ride.entity';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'password',
            database: 'shopperdb',
            entities: [DriverEntity, RideEntity],
            synchronize: true,
            autoLoadEntities: true,
        }),
        TypeOrmModule.forFeature([DriverEntity, RideEntity]),
    ],
    providers: [DriverRepository, RideRepository],
    exports: [DriverRepository, RideRepository],
})
export class DatabaseModule { }
