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
            host: process.env.DB_HOST,
            port: parseInt(process.env.DB_PORT, 10),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
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
