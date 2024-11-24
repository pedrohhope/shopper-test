import { Body, Controller, Get, Inject, Param, Patch, Post, Query } from "@nestjs/common";
import RideEstimateUseCase from "../use-cases/ride-estimate.use-case";
import { RideEstimateDTO } from "../dtos/ride-estimate.dto";
import ConfirmRideUseCase from "../use-cases/confirm-ride.use-case";
import { CreateRideDTO } from "../dtos/create-ride.dto";

@Controller('ride')
export class RideController {
    constructor(
        @Inject()
        private readonly rideEstimateUseCase: RideEstimateUseCase,

        @Inject()
        private readonly confirmRideUseCase: ConfirmRideUseCase
    ) { }

    @Get()
    async getRides(
        @Param('customer_id') customer_id: string,
        @Query('driver_id') driver_id: number
    ) {
        return {
            success: true
        }
    }


    @Post('estimate')
    async estimate(
        @Body() rideEstimateDTO: RideEstimateDTO
    ) {
        const {
            estimate,
            options,
        } = await this.rideEstimateUseCase.execute(rideEstimateDTO)


        return {
            estimate,
            options,
        }
    }

    @Patch('confirm')
    async confirm(
        @Body() createRideDTO: CreateRideDTO
    ) {
        await this.confirmRideUseCase.execute(createRideDTO)

        return {
            success: true
        }
    }

}
