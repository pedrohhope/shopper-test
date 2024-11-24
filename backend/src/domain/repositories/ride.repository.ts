import { CreateRideDTO } from "src/application/dtos/create-ride.dto";
import { RideEntity } from "../entities/ride.entity";

interface IRideRepository {
    create(ride: CreateRideDTO): Promise<boolean>;
    findByCustomerId(customer_id: string): Promise<Partial<RideEntity[]>>
}

export default IRideRepository