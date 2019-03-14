import { InjectionToken } from "@angular/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { FlashoutSettingsDto } from "./dto/flashout-settings.dto";

export const FLASHOUT_SETTINGS_FORM_GENERATOR =
    new InjectionToken<FormGenerator<FlashoutSettingsDto>>("formGenerator.flashoutSettings");