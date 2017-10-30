import {
    IsDefined, IsNotEmpty, IsOptional, IsString,
    registerDecorator, ValidationOptions
} from "class-validator";

export class CreateTemplateDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsDefined()
    @IsStringOrBufferAndNotEmpty()
    template: Buffer | string;

    @IsOptional()
    @IsString()
    description: string;
}

export class UpdateTemplateDto {

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsStringOrBufferAndNotEmpty()
    template: Buffer | string;

    @IsOptional()
    @IsString()
    description: string;
}


export function IsStringOrBufferAndNotEmpty(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: "IsStringOrBufferAndNotEmpty",
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any): boolean {
                    return (typeof value === "string" || Buffer.isBuffer(value)) && value.length !== 0;
                }
            }
        });
    };
}
