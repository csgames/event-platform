import { Control } from "../../../../../../form-generator/decorators/control.decorator";
import { Required } from "../../../../../../form-generator/decorators/required.decorator";

export class TrackFormDto {

    @Control()
    @Required()
    label: string;

    @Control()
    @Required()
    type: string;

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
}
