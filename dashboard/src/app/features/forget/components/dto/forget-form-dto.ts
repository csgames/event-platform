import { Control } from "src/app/form-generator/decorators/control.decorator";
import { Email } from "src/app/form-generator/decorators/email.decorator";
import { Required } from "src/app/form-generator/decorators/required.decorator";

export class ForgetFormDto {
    @Control()
    @Email()
    @Required()
    email: string;
}