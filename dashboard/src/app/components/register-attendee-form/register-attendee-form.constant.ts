import { InjectionToken } from "@angular/core";
import { Attendee } from "../../api/models/attendee";
import { FormGenerator } from "../../form-generator/form-generator";

export const REGISTER_ATTENDEE_FORM_GENERATOR = new InjectionToken<FormGenerator<Attendee>>("formGenerator.register-attendee");
