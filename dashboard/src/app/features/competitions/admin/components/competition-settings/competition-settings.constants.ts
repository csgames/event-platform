import { InjectionToken } from "@angular/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { CompetitionSettingsDto } from "./dto/competition-settings.dto";

export const COMPETITIONS_SETTINGS_FORM_GENERATOR =
    new InjectionToken<FormGenerator<CompetitionSettingsDto>>("formGenerator.competitionSettings");
