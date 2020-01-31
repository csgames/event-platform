import { Control } from "src/app/form-generator/decorators/control.decorator";
import { Required } from "src/app/form-generator/decorators/required.decorator";

export class ActivityFormDto {
    @Control()
    @Required()
    name: { [lang: string]: string };

    @Control()
    @Required()
    type: string;

    @Control()
    @Required()
    beginDate: Date;

    @Control()
    @Required()
    endDate: Date;

    @Control()
    @Required()
    beginTime: Date;

    @Control()
    @Required()
    endTime: Date;

    @Control()
    @Required()
    details: { [lang: string]: string };

    @Control()
    @Required()
    location: string;

    @Control({ defaultValue: false })
    @Required()
    hidden: boolean;
}
