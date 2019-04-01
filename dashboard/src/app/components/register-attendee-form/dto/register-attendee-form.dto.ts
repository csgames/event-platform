import { Control } from "../../../form-generator/decorators/control.decorator";
import { Required } from "../../../form-generator/decorators/required.decorator";
import { Email } from "../../../form-generator/decorators/email.decorator";

export class RegisterAttendeeFormDto {
    @Control()
    @Required()
    firstName: string;

    @Control()
    @Required()
    lastName: string;

    @Control()
    @Required()
    @Email()
    email: string;

    @Control()
    @Required()
    password: string;
}
