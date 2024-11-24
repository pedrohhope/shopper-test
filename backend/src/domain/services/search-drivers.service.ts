import { Inject, Injectable } from "@nestjs/common"
import DriverRepository from "../../infrastructure/repositories/driver.repository"

@Injectable()
class SearchDriversService {
    constructor(
        @Inject()
        private readonly driverRepository: DriverRepository
    ) { }
    async execute(min_distance: number) {
        const drivers = await this.driverRepository.findByMinDistance(min_distance)

        return drivers
    }
}

export default SearchDriversService