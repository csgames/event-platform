import { Control } from "../../../../../../form-generator/decorators/control.decorator";
import { Required } from "../../../../../../form-generator/decorators/required.decorator";
import { TranslateWebsite } from "src/app/api/models/guide";

export class SchoolFormDto {

    @Control()
    @Required()
    name: string;

    @Control()
    @Required()
    latitude: number;

    @Control()
    @Required()
    longitude: number;

    @Control()
    @Required()
    zoom: number;

    @Control()
    @Required()
    address: string;

    @Control()
    @Required()
    maps: string[];

    @Control()
    @Required()
    website: TranslateWebsite;


}
