import { DriverEntity } from "../entities/driver.entity"

interface IDriverRepository {
    findByMinDistance(min_distance: number): Promise<DriverEntity[]>
    findByIdAndName(id: number, name: string): Promise<DriverEntity>
}

export default IDriverRepository