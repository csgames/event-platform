import { InjectionToken } from "@angular/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { SponsorPositionningDto } from "./dto/sponsor-positionning.dto";

export const UPDATE_SPONSOR_POSITIONNING_FORM_GENERATOR =
    new InjectionToken<FormGenerator<SponsorPositionningDto>>("formGenerator.update-sponsor-positionning");
