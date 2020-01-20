import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../form-generator/form-generator";
import { QuestionFormDto } from "./dto/question-form.dto";

export const QUESTION_FORM_GENERATOR = new InjectionToken<FormGenerator<QuestionFormDto>>("formGenerator.question");
