import { Control } from "src/app/form-generator/decorators/control.decorator";
import { MatchesPattern } from "src/app/form-generator/decorators/matches-pattern.decorator";
import { Required } from "src/app/form-generator/decorators/required.decorator";
import { MatchesControl } from "src/app/form-generator/decorators/matches-control.decorator";

export class ChangePasswordDto {
    @Control()
    @Required()
    oldPassword: string;

    @Control()
    @MatchesPattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    newPassword: string;
    
    @Control()
    @Required()
    @MatchesControl("newPassword")
    confirmPassword: string;
}
