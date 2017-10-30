import { IsNotEmpty, IsString, registerDecorator, ValidationOptions } from "class-validator";

export class EmailSendDto {

    @IsString()
    @IsNotEmpty()
    from: string;

    @IsStringOrStringArrayAndNotEmpty()
    to: string | string[];

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

export function IsStringOrStringArrayAndNotEmpty(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "IsStringOrStringArrayAndNotEmpty",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any): boolean {
                    return (typeof value === "string" || IsArrayOfNonEmptyString(value)) && value.length !== 0;
                }
            }
        });
    };
}

function IsArrayOfNonEmptyString(value: any) {
    return Array.isArray(value) && value.every(s => typeof s === "string" && s.length !== 0);
}
