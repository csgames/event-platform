import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { TrackFormDto } from "./dto/track-form.dto";

export const TRACK_FORM_GENERATOR = new InjectionToken<FormGenerator<TrackFormDto>>("formGenerator.track");
