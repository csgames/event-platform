import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { ParkingFormDto } from "./dto/parking-form.dto";

export const PARKING_FORM_GENERATOR = new InjectionToken<FormGenerator<ParkingFormDto>>("formGenerator.parking");
