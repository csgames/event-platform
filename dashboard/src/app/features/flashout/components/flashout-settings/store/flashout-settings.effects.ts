import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { FlashoutService } from "src/app/providers/flashout.service";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { SaveSettings, FlashoutSettingsActionTypes, SaveSettingsSuccess, SaveSettingsError } from "./flashout-settings.actions";
import { switchMap, catchError, map, tap } from "rxjs/operators";
import { of } from "rxjs";
import { LoadEvents } from "src/app/store/app.actions";

@Injectable()
export class FlashoutSettingsEffects {
    constructor(private actions$: Actions, private flashoutService: FlashoutService,
                private toastrService: ToastrService, private translateService: TranslateService) { }

    @Effect()
    saveSettings$ = this.actions$.pipe(
        ofType<SaveSettings>(FlashoutSettingsActionTypes.SaveSettings),
        switchMap((action: SaveSettings) => this.flashoutService.saveSettings(action.dto)
            .pipe(
                map(() => new SaveSettingsSuccess()),
                catchError(() => of(new SaveSettingsError()))
            )
        )
    );

    @Effect({ dispatch: false })
    flashoutSettingsSuccess$ = this.actions$.pipe(
        ofType<SaveSettingsSuccess>(FlashoutSettingsActionTypes.SaveSettingsSuccess),
        tap(() => this.toastrService.success("", this.translateService.instant("components.puzzle_hero_settings.success"))),
    );

    
    @Effect({ dispatch: false })
    flashoutSettingsError$ = this.actions$.pipe(
        ofType<SaveSettingsError>(FlashoutSettingsActionTypes.SaveSettingsError),
        tap(() => this.toastrService.success("", this.translateService.instant("components.puzzle_hero_settings.error")))
    );
}
