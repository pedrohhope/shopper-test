import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from '../../domain/entities/driver.entity';
import DriverRepository from '../repositories/driver.repository';
import RideRepository from '../repositories/ride.repository';
import { RideEntity } from 'src/domain/entities/ride.entity';
import AppDataSource from './data-source';

@Module({
    imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        TypeOrmModule.forFeature([DriverEntity, RideEntity]),
    ],
    providers: [DriverRepository, RideRepository],
    exports: [DriverRepository, RideRepository],
})
export class DatabaseModule { }
