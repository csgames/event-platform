import { Control } from "src/app/form-generator/decorators/control.decorator";
import { Required } from "src/app/form-generator/decorators/required.decorator";

export class AddSponsorFormDto {
    @Control()
    @Required()
    name: string;

    @Control()
    @Required()
    description: { [language: string]: object };

    @Control()
    @Required()
    website: string;

    @Control()
    @Required()
    imageUrl: string;
}

export class SponsorDetailsDto {
    padding: number[];
    widthFactor: number;
    heightFactor: number;
}