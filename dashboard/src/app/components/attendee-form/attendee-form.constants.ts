import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../form-generator/form-generator";
import { Attendee } from "../../api/models/attendee";

export const ATTENDEE_FORM_GENERATOR = new InjectionToken<FormGenerator<Attendee>>("formGenerator.attendee");
