import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import CreateRideService from "../../domain/services/create-ride.service";
import { CreateRideDTO } from "../dtos/create-ride.dto";
import FindDriverService from "../../domain/services/find-driver.service";

class ConfirmRideUseCase {
    constructor(
        @Inject()
        private readonly createRideService: CreateRideService,

        @Inject()
        private readonly findDriverService: FindDriverService
    ) { }

    async execute(ride: CreateRideDTO) {
        await this.validateDriver(ride);

        return await this.createRideService.execute({
            ...ride,
            value: ride.value * 100
        });
    }


    private async validateDriver(ride: CreateRideDTO) {
        const { id } = ride.driver;
        const driver = await this.findDriverService.execute(id);

        if (!driver) {
            this.handleDriverNotFound();
        }

        if (driver.min_distance > ride.distance) {
            this.handleInvalidDistance();
        }

        return driver;
    }


    private handleDriverNotFound() {
        throw new HttpException(
            {
                error_code: "DRIVER_NOT_FOUND",
                error_description: "Motorista não encontrado",
            },
            HttpStatus.NOT_FOUND
        );
    }

    private handleInvalidDistance() {
        throw new HttpException(
            {
                error_code: "DRIVER_NOT_AVAILABLE",
                error_description: "Quilometragem inválida para o motorista",
            },
            HttpStatus.BAD_REQUEST
        );
    }
}

export default ConfirmRideUseCase;
