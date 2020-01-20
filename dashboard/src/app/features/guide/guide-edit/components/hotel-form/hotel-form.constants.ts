import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { HotelFormDto } from "./dto/hotel-form.dto";

export const HOTEL_FORM_GENERATOR = new InjectionToken<FormGenerator<HotelFormDto>>("formGenerator.hotel");
