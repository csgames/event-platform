import {
    IsDefined,
    IsNotEmpty,
    IsOptional,
    IsString
} from "class-validator";
import { EmailMessage } from "./email.interface";

export class EmailSendDto {
    @IsString()
    @IsNotEmpty()
    from: string;

    @IsDefined()
    to: string[];

    @IsString()
    @IsNotEmpty()
    subject: string;

    @IsString()
    @IsNotEmpty()
    text: string;

    @IsOptional()
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

export function dtoToMailgunReadable(emailSendDto: EmailSendDto): EmailMessage {
    return {
        from: emailSendDto.from,
        to: emailSendDto.to,
        subject: emailSendDto.subject,
        text: emailSendDto.text,
        html: emailSendDto.html,
    };
}
