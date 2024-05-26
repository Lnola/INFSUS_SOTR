import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsRegistration(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(plate: any) {
          const registrationRegex = /^[A-Z]{2}-\d{3,4}-[A-Z]{1,2}$/;
          return typeof plate === 'string' && registrationRegex.test(plate);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must be a valid Croatian license plate`;
        },
      },
    });
  };
}
