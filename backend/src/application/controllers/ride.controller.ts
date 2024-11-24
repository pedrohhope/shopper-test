import { Body, Controller, Inject, Post } from "@nestjs/common";
import RideEstimateUseCase from "../use-cases/ride-estimate.use-case";
import { RideEstimateDTO } from "../dtos/ride-estimate.dto";

@Controller('ride')
export class RideController {
    constructor(
        @Inject()
        private readonly rideEstimateUseCase: RideEstimateUseCase
    ) { }

    @Post('estimate')
    async estimate(
        @Body() params: RideEstimateDTO
    ) {
        const {
            estimate,
            options,
        } = await this.rideEstimateUseCase.execute(params)


        return {
            estimate,
            options,
        }
    }
}
