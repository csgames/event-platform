import { Control } from "../../../form-generator/decorators/control.decorator";
import { Required } from "../../../form-generator/decorators/required.decorator";

export class EventFormDto {
    @Control()
    @Required()
    name: string;

    @Control()
    @Required()
    details: { [lang: string]: string };

    @Control()
    @Required()
    beginDate: Date;

    @Control()
    @Required()
    endDate: Date;

    @Control()
    @Required()
    imageUrl: string;

    @Control()
    @Required()
    coverUrl: string;

    @Control()
    @Required()
    teamEditLockDate: Date;

    @Control()
    @Required()
    primaryColor: string;

    @Control()
    @Required()
    disclaimer: { [lang: string]: string };

    @Control()
    publicTransportation: boolean;

    @Control()
    askDietaryRestriction: boolean;
}
