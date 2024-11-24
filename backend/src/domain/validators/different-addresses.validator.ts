import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'IsDifferentAddresses', async: false })
export class IsDifferentAddresses implements ValidatorConstraintInterface {
    validate(destination: string, args: ValidationArguments): boolean {
        const object = args.object as any;
        return object.origin !== destination;
    }

    defaultMessage(args: ValidationArguments): string {
        return 'Origin and destination cannot be the same address.';
    }
}
