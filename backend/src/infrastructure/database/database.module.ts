import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverEntity } from '../../domain/entities/driver.entity';
import DriverRepository from '../repositories/driver.repository';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'password',
            database: 'shopperdb',
            entities: [DriverEntity],
            synchronize: false,
            autoLoadEntities: false,
        }),
        TypeOrmModule.forFeature([DriverEntity]),
    ],
    providers: [DriverRepository],
    exports: [DriverRepository],
})
export class DatabaseModule { }
