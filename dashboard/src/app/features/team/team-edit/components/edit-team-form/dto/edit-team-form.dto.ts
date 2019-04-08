import { Control } from "../../../../../../form-generator/decorators/control.decorator";
import { Required } from "../../../../../../form-generator/decorators/required.decorator";
import { Email } from "../../../../../../form-generator/decorators/email.decorator";

export class EditTeamFormDto {
    @Control()
    @Required()
    name: string;

    @Control()
    @Required()
    maxMembersNumber: number;

    @Control()
    school: string;

    @Control()
    sponsor: string;
}
