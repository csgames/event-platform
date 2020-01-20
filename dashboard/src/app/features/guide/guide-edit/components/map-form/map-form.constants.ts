import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { SchoolFormDto } from "../school-form/dto/school-form.dto";

export const MAP_FORM_GENERATOR = new InjectionToken<FormGenerator<SchoolFormDto>>("formGenerator.map");
