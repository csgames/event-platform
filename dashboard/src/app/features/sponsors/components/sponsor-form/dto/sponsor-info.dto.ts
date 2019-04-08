import { Control } from "src/app/form-generator/decorators/control.decorator";
import { Required } from "src/app/form-generator/decorators/required.decorator";

export class SponsorInfoDto {
    @Control()
    @Required()
    name: string;

    @Control()
    @Required()
    description: any;

    @Control()
    @Required()
    website: string;
    
    @Control()
    @Required()
    imageUrl: string
}