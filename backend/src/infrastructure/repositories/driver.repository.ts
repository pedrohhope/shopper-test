import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DriverEntity } from "../../domain/entities/driver.entity";
import IDriverRepository from "../../domain/repositories/driver.repository";
import { LessThanOrEqual, Repository } from "typeorm";

@Injectable()
class DriverRepository implements IDriverRepository {
    constructor(
        @InjectRepository(DriverEntity)
        private readonly driverRepository: Repository<DriverEntity>
    ) { }


    async findByMinDistance(min_distance: number): Promise<DriverEntity[]> {
        const drivers = await this.driverRepository.find({
            where: {
                min_distance: LessThanOrEqual(min_distance)
            },
        })

        return drivers
    }

    async findByIdAndName(id: number, name: string): Promise<DriverEntity> {
        const driver = await this.driverRepository.findOne({
            where: {
                id,
                name,
            }
        })

        return driver
    }
}

export default DriverRepository