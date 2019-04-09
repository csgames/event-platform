import { Control } from "../../../../../../form-generator/decorators/control.decorator";
import { Required } from "../../../../../../form-generator/decorators/required.decorator";

export class HotelFormDto {

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
}
