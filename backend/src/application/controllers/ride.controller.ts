import { Body, Controller, Inject, Patch, Post } from "@nestjs/common";
import RideEstimateUseCase from "../use-cases/ride-estimate.use-case";
import { RideEstimateDTO } from "../dtos/ride-estimate.dto";
import CreateRideUseCase from "../use-cases/create-ride.use-case";
import { CreateRideDTO } from "../dtos/create-ride.dto";

@Controller('ride')
export class RideController {
    constructor(
        @Inject()
        private readonly rideEstimateUseCase: RideEstimateUseCase,

        @Inject()
        private readonly createRideUseCase: CreateRideUseCase
    ) { }

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
        await this.createRideUseCase.execute(createRideDTO)

        return {
            success: true
        }
    }
}
