import { InjectionToken } from "@angular/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { SponsorInfoDto } from "../components/sponsor-form/dto/sponsor-info.dto";

export const ADD_SPONSOR_FORM_GENERATOR = new InjectionToken<FormGenerator<SponsorInfoDto>>("formGenerator.add-sponsor");
