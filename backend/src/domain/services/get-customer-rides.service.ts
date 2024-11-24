import { Inject } from "@nestjs/common"
import RideRepository from "src/infrastructure/repositories/ride.repository"


class GetCustomerRidesService {
    constructor(
        @Inject()
        private readonly rideRepository: RideRepository
    ) { }

    async execute(id: string, driver_id?: number) {
        const rides = await this.rideRepository.findByCustomerId(id, driver_id)

        return rides
    }
}

export default GetCustomerRidesService