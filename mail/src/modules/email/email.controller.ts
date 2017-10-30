import { Body, Controller, Post } from "@nestjs/common";
import { EmailService } from "./email.service";
import { ValidationPipe } from "../../pipes/validation.pipe";
import { EmailSendDto } from "./email.dto";

@Controller("email")
export class EmailController {
    constructor(private readonly emailService: EmailService) {
    }

    @Post()
    async send(@Body(new ValidationPipe()) emailSendDto: EmailSendDto) {
        return this.emailService.send(emailSendDto);
    }
}
