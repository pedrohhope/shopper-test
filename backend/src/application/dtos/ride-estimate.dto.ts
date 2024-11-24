import { IsNotEmpty, IsString, Validate } from 'class-validator';
import { IsDifferentAddresses } from 'src/domain/validators/different-addresses.validator';

export class RideEstimateDTO {
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
}
