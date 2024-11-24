import { Inject, Injectable } from "@nestjs/common"
import DriverRepository from "../../infrastructure/repositories/driver.repository"

@Injectable()
class FindDriverService {
    constructor(
        @Inject()
        private readonly driverRepository: DriverRepository
    ) { }
    async execute(id: number) {
        const driver = await this.driverRepository.findById(id)

        return driver
    }
}

export default FindDriverService