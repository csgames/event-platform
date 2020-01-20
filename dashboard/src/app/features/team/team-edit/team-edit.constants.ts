import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../../form-generator/form-generator";
import { AddTeamFormDto } from "./components/add-team-form/dto/add-team-form.dto";

export const ADD_TEAM_FORM_GENERATOR = new InjectionToken<FormGenerator<AddTeamFormDto>>("formGenerator.add-team");
export const EDIT_TEAM_FORM_GENERATOR = new InjectionToken<FormGenerator<AddTeamFormDto>>("formGenerator.edit-team");
