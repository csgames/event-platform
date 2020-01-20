import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { SchoolFormDto } from "./dto/school-form.dto";

export const SCHOOL_FORM_GENERATOR = new InjectionToken<FormGenerator<SchoolFormDto>>("formGenerator.school");
