import { Control } from "../../../../../../form-generator/decorators/control.decorator";
import { Required } from "../../../../../../form-generator/decorators/required.decorator";

export class CoordinateDto {
    @Control()
    @Required()
    latitude: number;

    @Control()
    @Required()
    longitude: number;
}

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

    @Control({ childrenClass: CoordinateDto })
    @Required()
    coordinates: CoordinateDto[];

}
