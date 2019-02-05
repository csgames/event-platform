import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../form-generator/form-generator";
import { Attendee } from "../../api/models/attendee";

export const ADD_ATTENDEE_FORM_GENERATOR = new InjectionToken<FormGenerator<Attendee>>("formGenerator.add-attendee");
