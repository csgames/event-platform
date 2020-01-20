import { Control } from "../../../../../../form-generator/decorators/control.decorator";
import { Required } from "../../../../../../form-generator/decorators/required.decorator";
import { TranslateInfo } from "src/app/api/models/guide";

export class TransportationFormDto {

    @Control()
    @Required()
    info: TranslateInfo;

    @Control()
    @Required()
    image: string;

    @Control()
    @Required()
    school: string;

    @Control()
    @Required()
    hotel: string;

    @Control()
    @Required()
    schoolLatitude: number;

    @Control()
    @Required()
    schoolLongitude: number;

    @Control()
    @Required()
    hotelLatitude: number;

    @Control()
    @Required()
    hotelLongitude: number;
}
