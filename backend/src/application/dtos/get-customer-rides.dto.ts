import { IsEmpty, IsNotEmpty, IsString } from "class-validator"


export class GetCustomerRidesDTO {
    @IsNotEmpty()
    @IsString()
    customer_id: string

    @IsEmpty()
    @IsString()
    driver_id?: number
}