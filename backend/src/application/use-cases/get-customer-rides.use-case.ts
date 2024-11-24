import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import FindDriverService from "src/domain/services/find-driver.service";
import { GetCustomerRidesDTO } from "../dtos/get-customer-rides.dto";
import GetCustomerRidesService from "src/domain/services/get-customer-rides.service";


class GetCustomerRidesUseCase {
    constructor(
        @Inject()
        private readonly findDriverService: FindDriverService,

        @Inject()
        private readonly getCustomerRidesService: GetCustomerRidesService

    ) { }

    async execute({
        customer_id,
        driver_id
    }: GetCustomerRidesDTO) {
        if (driver_id) {
            const driver = await this.findDriverService.execute(driver_id)

            if (!driver) this.handleInvalidDriver()
        }

        const rides = this.getRides(customer_id, driver_id)

        return rides
    }

    private async getRides(customer_id: string, driver_id?: number) {
        const rides = await this.getCustomerRidesService.execute(customer_id, driver_id)

        if (!rides.length) this.handleRideNotFound()

        const formattedRides = rides.map(ride => {
            return {
                id: ride.id,
                date: ride.created_at,
                origin: ride.origin,
                destination: ride.destination,
                distance: ride.distance,
                duration: ride.duration,
                driver: {
                    id: ride.driver.id,
                    name: ride.driver.name
                },
                value: ride.value,
            }
        })

        return formattedRides
    }


    private handleInvalidDriver() {
        throw new HttpException({
            error_code: "INVALID_DRIVER",
            error_description: "Motorista inválido"
        }, HttpStatus.BAD_REQUEST)
    }

    private handleRideNotFound() {
        throw new HttpException({
            error_code: "NO_RIDES_FOUND",
            error_description: "Nenhum registro encontrado"
        }, HttpStatus.NOT_FOUND)
    }



}

export default GetCustomerRidesUseCase