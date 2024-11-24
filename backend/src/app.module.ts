import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { RideController } from './application/controllers/ride.controller';
import RideEstimateUseCase from './application/use-cases/ride-estimate.use-case';
import { GoogleApiService } from './infrastructure/external-services/google-api.service';
import { HttpModule } from '@nestjs/axios';
import SearchDriversService from './domain/services/search-drivers.service';

@Module({
  imports: [DatabaseModule, HttpModule],
  controllers: [RideController],
  providers: [
    RideEstimateUseCase,
    GoogleApiService,
    SearchDriversService,
  ],
})
export class AppModule { }
