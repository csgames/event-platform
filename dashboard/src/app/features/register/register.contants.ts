import { InjectionToken } from "@angular/core";
import { CreateAttendeeFormDto } from "./dto/create-attendee-form-dto";
import { FormGenerator } from "../../form-generator/form-generator";

export const REGISTER_FORM_GENERATOR = new InjectionToken<FormGenerator<CreateAttendeeFormDto>>("formGenerator.register");
