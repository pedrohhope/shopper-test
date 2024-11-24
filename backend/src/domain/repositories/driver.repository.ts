import { DriverEntity } from "../entities/driver.entity"

interface IDriverRepository {
    findByMinDistance(min_distance: number): Promise<DriverEntity[]>
}

export default IDriverRepository