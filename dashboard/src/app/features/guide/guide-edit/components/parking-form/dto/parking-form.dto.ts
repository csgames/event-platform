import { Control } from "../../../../../../form-generator/decorators/control.decorator";
import { Required } from "../../../../../../form-generator/decorators/required.decorator";
import { Coordinate } from "src/app/api/models/guide";

export class ParkingFormDto {

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
    coordinates: Coordinate[];

}
