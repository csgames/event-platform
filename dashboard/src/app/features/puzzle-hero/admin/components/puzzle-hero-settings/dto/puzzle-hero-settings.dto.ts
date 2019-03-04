import { Control } from "../../../../../../form-generator/decorators/control.decorator";
import { Required } from "../../../../../../form-generator/decorators/required.decorator";

export class PuzzleHeroSettingsDto {
    @Control()
    @Required()
    releaseDate: Date;

    @Control()
    @Required()
    releaseTime: Date;

    @Control()
    @Required()
    endDate: Date;

    @Control()
    @Required()
    endTime: Date;

    @Control()
    @Required()
    scoreboardEndDate: Date;

    @Control()
    @Required()
    scoreboardEndTime: Date;

    @Control()
    @Required()
    open: boolean;
}
