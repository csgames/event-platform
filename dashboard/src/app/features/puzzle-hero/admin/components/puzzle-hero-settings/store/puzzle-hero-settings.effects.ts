import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { PuzzleHeroService } from "../../../../../../providers/puzzle-hero.service";
import { PuzzleHeroSettingsActionTypes, SaveSettings, SaveSettingsError, SaveSettingsSuccess } from "./puzzle-hero-settings.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { LoadPuzzleHero } from "../../../store/puzzle-admin.actions";
import { GetPuzzleHeroInfo } from "../../../../../../store/app.actions";

@Injectable()
export class PuzzleHeroSettingsEffects {
    constructor(private actions$: Actions, private puzzleHeroService: PuzzleHeroService,
                private toastrService: ToastrService, private translateService: TranslateService) {}

    @Effect()
    saveSettings$ = this.actions$.pipe(
        ofType<SaveSettings>(PuzzleHeroSettingsActionTypes.SaveSettings),
        switchMap((action: SaveSettings) => this.puzzleHeroService.updatePuzzleHero(action.puzzleHeroSettingsDto)
            .pipe(
                map(() => new SaveSettingsSuccess()),
                catchError(() => of(new SaveSettingsError()))
            )
        )
    );

    @Effect()
    saveSettingsSuccess$ = this.actions$.pipe(
        ofType<SaveSettingsSuccess>(PuzzleHeroSettingsActionTypes.SaveSettingsSuccess),
        tap(() => this.toastrService.success("", this.translateService.instant("components.puzzle_hero_settings.success"))),
        switchMap(() => [new LoadPuzzleHero(), new GetPuzzleHeroInfo()])
    );
}
