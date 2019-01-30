import { InjectionToken } from "@angular/core";
import { ForgetFormDto } from "./components/dto/forget-form-dto";
import { FormGenerator } from "src/app/form-generator/form-generator";

export const FORGET_FORM_GENERATOR = new InjectionToken<FormGenerator<ForgetFormDto>>("formGenerator.forget");
