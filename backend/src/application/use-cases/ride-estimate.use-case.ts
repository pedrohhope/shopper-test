import { Inject } from "@nestjs/common"
import SearchDriversService from "src/domain/services/search-drivers.service"
import { GoogleApiService } from "src/infrastructure/external-services/google-api.service"
import { RideEstimateDTO } from "../dtos/ride-estimate.dto"


class RideEstimateUseCase {
    constructor(
        @Inject()
        private readonly googleApiService: GoogleApiService,

        @Inject()
        private readonly searchDriversService: SearchDriversService
    ) { }


    async execute(params: RideEstimateDTO) {
        const estimate = await this.getEstimate(params)
        const options = await this.getOptions(estimate.distance)


        return {
            estimate,
            options
        }
    }

    private async getOptions(estimate_distance: number) {
        const drivers = await this.searchDriversService.execute(estimate_distance)

        const options = drivers.map(driver => {
            return {
                id: driver.id,
                name: driver.name,
                description: driver.description,
                vehicle: driver.vehicle,
                review: {
                    rating: driver.review_rating,
                    comment: driver.review_comment
                },
                value: driver.rate_per_km * estimate_distance
            }
        })
            .sort((a, b) => a.value - b.value)


        return options
    }


    private async getEstimate(params: {
        origin: string,
        destination: string
    }) {
        const {
            distance,
            destination,
            duration,
            origin,
            routeResponse
        } = await this.googleApiService.computeRoutes(params.origin, params.destination, 'DRIVE')

        return {
            distance,
            duration,
            origin,
            destination,
            routeResponse
        }
    }

}

export default RideEstimateUseCase