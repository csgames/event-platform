import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../form-generator/form-generator";
import { EventFormDto } from "./dto/event-form.dto";

export const EVENT_FORM_GENERATOR = new InjectionToken<FormGenerator<EventFormDto>>("formGenerator.event");
