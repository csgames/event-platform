import { InjectionToken } from "@angular/core";
import { UserFormDto } from "./dto/user-form.dto";
import { FormGenerator } from "../../form-generator/form-generator";

export const USER_FORM_GENERATOR = new InjectionToken<FormGenerator<UserFormDto>>("formGenerator.register");
