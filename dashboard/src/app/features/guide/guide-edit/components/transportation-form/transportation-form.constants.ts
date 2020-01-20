import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { TransportationFormDto } from "./dto/transportation-form.dto";

export const TRANSPORTATION_FORM_GENERATOR = new InjectionToken<FormGenerator<TransportationFormDto>>("formGenerator.transportation");
