
import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsDifferentAddresses } from 'src/domain/validators/different-addresses.validator';

export class CreateRideDTO {
    @IsNotEmpty()
    @IsString()
    customer_id: string;

    @IsNotEmpty()
    @IsString()
    origin: string;

    @IsNotEmpty()
    @IsString()
    @Validate(IsDifferentAddresses)
    destination: string;

    @IsNotEmpty()
    distance: number;

    @IsNotEmpty()
    duration: string;

    @IsNotEmpty()
    driver: {
        id: number,
        name: string
    };

    @IsNotEmpty()
    value: number
}
