import { Control } from "../../../../../../form-generator/decorators/control.decorator";
import { Required } from "../../../../../../form-generator/decorators/required.decorator";
import { Email } from "../../../../../../form-generator/decorators/email.decorator";

export class AddTeamFormDto {
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
    teamName: string;

    @Control()
    @Required()
    maxMembersNumber: number;

    @Control()
    @Required()
    schoolId: string;
}
