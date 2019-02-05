import { InjectionToken } from "@angular/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { ChangePasswordDto } from "./dto/change-password.dto";

export const CHANGE_PASSWORD_GENERATOR = new InjectionToken<FormGenerator<ChangePasswordDto>>("formGenerator.changePassword");
