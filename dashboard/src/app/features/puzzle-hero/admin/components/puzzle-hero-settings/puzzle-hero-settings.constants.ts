import { InjectionToken } from "@angular/core";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { PuzzleHeroSettingsDto } from "./dto/puzzle-hero-settings.dto";

export const PUZZLE_HERO_SETTINGS_FORM_GENERATOR =
    new InjectionToken<FormGenerator<PuzzleHeroSettingsDto>>("formGenerator.puzzleHeroSettings");
