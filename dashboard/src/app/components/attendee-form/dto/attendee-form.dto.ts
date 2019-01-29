import { Control } from "../../../form-generator/decorators/control.decorator";
import { Required } from "../../../form-generator/decorators/required.decorator";
import { MinLength } from "../../../form-generator/decorators/min-length.decorator";
import { MaxLength } from "../../../form-generator/decorators/max-length.decorator";

export class AttendeeFormDto {
    @Control()
    @Required()
    gender: string;

    @Control()
    @Required()
    tshirt: string;

    @Control()
    github: string;

    @Control()
    linkedIn: string;

    @Control()
    website: string;

    @Control()
    @Required()
    @MinLength(11)
    @MaxLength(11)
    phoneNumber: string;
}
