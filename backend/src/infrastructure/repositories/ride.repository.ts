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

    async findByCustomerId(customer_id: string, driver_id?: number): Promise<Partial<RideEntity[]>> {
        const result = await this.rideRepository.find(
            {
                relations: ['driver'],
                where: {
                    customer_id,
                    driver_id
                },
                order: {
                    created_at: 'DESC'
                },
                select: {
                    id: true,
                    origin: true,
                    destination: true,
                    distance: true,
                    duration: true,
                    driver: {
                        id: true,
                        name: true
                    },
                    value: true,
                    created_at: true
                }
            }
        )
        return result
    }

}

export default RideRepository