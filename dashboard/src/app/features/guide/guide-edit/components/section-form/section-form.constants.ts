import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { SectionFormDto } from "./dto/section-form.dto";

export const SECTION_FORM_GENERATOR = new InjectionToken<FormGenerator<SectionFormDto>>("formGenerator.section");
