import { Control } from "src/app/form-generator/decorators/control.decorator";
import { Required } from "src/app/form-generator/decorators/required.decorator";

export class CompetitionFormDto {
    @Control()
    @Required()
    activities: string;

    @Control()
    directors: string;

    @Control()
    @Required()
    maxMembers: number;

    @Control()
    @Required()
    password: string;

    @Control()
    onDashboard: boolean;

    @Control()
    isLive: boolean;
}
