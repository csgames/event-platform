import { Control } from "../../../../../form-generator/decorators/control.decorator";
import { Email } from "../../../../../form-generator/decorators/email.decorator";
import { Required } from "../../../../../form-generator/decorators/required.decorator";

export class AddAttendeeFormDto {
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
