import { Inject, Injectable } from "@nestjs/common"
import DriverRepository from "../../infrastructure/repositories/driver.repository"

@Injectable()
class FindDriverService {
    constructor(
        @Inject()
        private readonly driverRepository: DriverRepository
    ) { }
    async execute(id: number, name: string) {
        const driver = await this.driverRepository.findByIdAndName(id, name)

        return driver
    }
}

export default FindDriverService