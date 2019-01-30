import { Control } from "../../../form-generator/decorators/control.decorator";
import { Email } from "../../../form-generator/decorators/email.decorator";
import { Required } from "../../../form-generator/decorators/required.decorator";
import { MatchesControl } from "../../../form-generator/decorators/matches-control.decorator";
import { MatchesPattern } from "../../../form-generator/decorators/matches-pattern.decorator";

export class UserFormDto {
    @Control()
    @Email()
    @Required()
    username: string;

    @Control()
    @Required()
    firstName: string;

    @Control()
    @Required()
    lastName: string;

    @Control()
    @MatchesPattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    @Required()
    password: string;

    @Control()
    @Required()
    @MatchesControl("password")
    confirmPassword: string;
}
