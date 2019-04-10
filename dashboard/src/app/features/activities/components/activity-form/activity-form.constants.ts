import { InjectionToken } from "@angular/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { ActivityFormDto } from "./dto/activity-form.dto";

export const ACTIVITY_FORM_GENERATOR = new InjectionToken<FormGenerator<ActivityFormDto>>("formGenerator.activity");
