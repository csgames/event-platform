import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { EmailSendDto } from "./email.dto";
import { EmailService } from "./email.service";
import { ValidationPipe } from "../../../pipes/validation.pipe";
import { PermissionsGuard } from "../../../guards/permission.guard";
import { Permissions } from "../../../decorators/permission.decorator";

@Controller("email")
@UseGuards(PermissionsGuard)
export class EmailController {
    constructor(private readonly emailService: EmailService) {
    }

    @Post()
    @Permissions("mail-api:send:email")
    public async send(@Body(new ValidationPipe()) emailSendDto: EmailSendDto) {
        return this.emailService.send(emailSendDto);
    }
}
