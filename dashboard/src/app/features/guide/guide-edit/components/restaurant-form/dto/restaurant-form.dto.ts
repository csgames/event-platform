import { Control } from "../../../../../../form-generator/decorators/control.decorator";
import { Required } from "../../../../../../form-generator/decorators/required.decorator";

export class RestaurantCoordinateDto {
    @Control()
    @Required()
    info: string;

    @Control()
    @Required()
    latitude: number;

    @Control()
    @Required()
    longitude: number;
}

export class RestaurantFormDto {

    @Control()
    @Required()
    latitude: number;

    @Control()
    @Required()
    longitude: number;

    @Control()
    @Required()
    zoom: number;

    @Control({ childrenClass: RestaurantCoordinateDto })
    @Required()
    coordinates: RestaurantCoordinateDto[];
}
