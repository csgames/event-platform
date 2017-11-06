import { ArrayNotEmpty, IsDefined, IsNotEmpty, IsString, registerDecorator, ValidationOptions } from "class-validator";

export class EmailSendDto {
    @IsString()
    @IsNotEmpty()
    from: string;

    @IsStringArray()
    @IsDefined()
    @ArrayNotEmpty()
    to: string[];

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsString()
    @IsNotEmpty()
    html: string;
}

export function IsStringArray(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "IsStringArray",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any): boolean {
                    return Array.isArray(value) && value.every(s => typeof s === "string");
                }
            }
        });
    };
}
