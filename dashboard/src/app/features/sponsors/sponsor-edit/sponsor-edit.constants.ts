import { InjectionToken } from "@angular/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { AddSponsorFormDto } from "../components/sponsor-form/dto/add-sponsor.dto";

export const ADD_SPONSOR_FORM_GENERATOR = new InjectionToken<FormGenerator<AddSponsorFormDto>>("formGenerator.add-sponsor");
