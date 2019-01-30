import { Control } from "src/app/form-generator/decorators/control.decorator";
import { MatchesPattern } from "src/app/form-generator/decorators/matches-pattern.decorator";
import { Required } from "src/app/form-generator/decorators/required.decorator";
import { MatchesControl } from "src/app/form-generator/decorators/matches-control.decorator";

export class ResetFormDto {
    @Control()
    @MatchesPattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    password: string;
    
    @Control()
    @Required()
    @MatchesControl("password")
    confirmPassword: string;
}