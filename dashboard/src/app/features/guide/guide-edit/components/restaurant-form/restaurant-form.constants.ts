import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { RestaurantFormDto } from "../restaurant-form/dto/restaurant-form.dto";

export const RESTAURANT_FORM_GENERATOR = new InjectionToken<FormGenerator<RestaurantFormDto>>("formGenerator.restaurant");
