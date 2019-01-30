import { InjectionToken } from "@angular/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { ResetFormDto } from "./dto/reset-form-dto";

export const RESET_FORM_GENERATOR = new InjectionToken<FormGenerator<ResetFormDto>>("formGenerator.reset");
