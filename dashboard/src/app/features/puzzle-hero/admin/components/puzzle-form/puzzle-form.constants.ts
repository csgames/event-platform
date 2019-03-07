import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { PuzzleFormDto } from "./dto/puzzle-form.dto";

export const PUZZLE_FORM_GENERATOR = new InjectionToken<FormGenerator<PuzzleFormDto>>("formGenerator.puzzle");
