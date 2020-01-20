import { InjectionToken } from "@angular/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { FlashoutEditDto } from "./components/flashout-form/dto/flashout-edit.dto";

export const ADD_FLASHOUT_FORM_GENERATOR = new InjectionToken<FormGenerator<FlashoutEditDto>>("formGenerator.add-flashout");
