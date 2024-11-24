import { Inject, Injectable } from "@nestjs/common";
import { CreateRideDTO } from "../../application/dtos/create-ride.dto";
import RideRepository from "../../infrastructure/repositories/ride.repository";

@Injectable()
class CreateRideService {
    constructor(
        @Inject()
        private readonly rideRepository: RideRepository
    ) { }

    async execute(ride: CreateRideDTO): Promise<boolean> {
        const result = await this.rideRepository.create(ride)
        return result
    }
}

export default CreateRideService