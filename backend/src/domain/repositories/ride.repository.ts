import { CreateRideDTO } from "src/application/dtos/create-ride.dto";

interface IRideRepository {
    create(ride: CreateRideDTO): Promise<boolean>;
}

export default IRideRepository