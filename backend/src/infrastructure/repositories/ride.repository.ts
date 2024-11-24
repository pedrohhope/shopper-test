import { Injectable } from "@nestjs/common";
import { RideEntity } from "../../domain/entities/ride.entity";
import { Repository } from "typeorm";
import IRideRepository from "src/domain/repositories/ride.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateRideDTO } from "src/application/dtos/create-ride.dto";


@Injectable()
class RideRepository implements IRideRepository {
    constructor(
        @InjectRepository(RideEntity)
        private readonly rideRepository: Repository<RideEntity>
    ) { }

    async create(ride: CreateRideDTO): Promise<boolean> {
        const result = await this.rideRepository.save(ride)
        return !!result
    }

}

export default RideRepository