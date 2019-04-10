import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { CompetitionsService } from "src/app/providers/competitions.service";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import {
    SaveCompetitionSettings,
    CompetitionSettingsActionTypes,
    SaveCompetitionSettingsSuccess,
    SaveCompetitionSettingsError
} from "./competition-settings.actions";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";

@Injectable()
export class CompetitionSettingsEffects {
    constructor(
        private actions$: Actions,
        private competitionService: CompetitionsService,
        private toastr: ToastrService,
        private translateService: TranslateService
    ) {}

    @Effect()
    saveCompetitionSettings = this.actions$.pipe(
        ofType<SaveCompetitionSettings>(CompetitionSettingsActionTypes.SaveCompetitionSettings),
        switchMap((action: SaveCompetitionSettings) => this.competitionService.updateCompetitionSettings(action.dto)
            .pipe(
                map(() => new SaveCompetitionSettingsSuccess()),
                catchError(() => of(new SaveCompetitionSettingsError()))
            )
        )
    );

    @Effect({ dispatch: false })
    flashoutSettingsSuccess$ = this.actions$.pipe(
        ofType<SaveCompetitionSettingsSuccess>(CompetitionSettingsActionTypes.SaveCompetitionSettingsSuccess),
        tap(() => this.toastr.success("", this.translateService.instant("components.puzzle_hero_settings.success"))),
    );

    
    @Effect({ dispatch: false })
    flashoutSettingsError$ = this.actions$.pipe(
        ofType<SaveCompetitionSettingsError>(CompetitionSettingsActionTypes.SaveCompetitionSettingsError),
        tap(() => this.toastr.error("", this.translateService.instant("components.puzzle_hero_settings.error")))
    );
}
