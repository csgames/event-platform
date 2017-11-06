import {
    ArrayNotEmpty,
    IsDefined,
    IsNotEmpty,
    IsOptional,
    IsString,
    registerDecorator,
    ValidationOptions
} from "class-validator";
import { EmailMessage } from "./email.interface";

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

    // If template is present, will overwrite html.
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    template: string;

    @IsOptional()
    variables: { [key: string]: string };
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

export function dtoToMailgunReadable(emailSendDto: EmailSendDto): EmailMessage {
    return {
        from: emailSendDto.from,
        to: emailSendDto.to,
        subject: emailSendDto.subject,
        text: emailSendDto.text,
        html: emailSendDto.html,
    };
}
