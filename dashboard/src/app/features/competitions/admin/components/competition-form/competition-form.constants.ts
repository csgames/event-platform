import { InjectionToken } from "@angular/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { CompetitionFormDto } from "./dto/competition-form.dto";

export const COMPETITION_FORM_GENERATOR = new InjectionToken<FormGenerator<CompetitionFormDto>>("formGenerator.competition");
