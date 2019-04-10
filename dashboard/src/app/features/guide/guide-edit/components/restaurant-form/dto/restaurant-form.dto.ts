import { Control } from "../../../../../../form-generator/decorators/control.decorator";
import { Required } from "../../../../../../form-generator/decorators/required.decorator";
import { RestaurantCoordinate } from "src/app/api/models/guide";

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

    @Control()
    @Required()
    coordinates: RestaurantCoordinate[];
}
