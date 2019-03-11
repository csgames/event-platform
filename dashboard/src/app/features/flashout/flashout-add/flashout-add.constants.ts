import { InjectionToken } from "@angular/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { AddFlashoutDto } from "./dto/add-flashout.dto";

export const ADD_FLASHOUT_FORM_GENERATOR = new InjectionToken<FormGenerator<AddFlashoutDto>>("formGenerator.add-flashout");