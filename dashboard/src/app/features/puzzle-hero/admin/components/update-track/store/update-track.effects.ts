import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { PuzzleHeroService } from "../../../../../../providers/puzzle-hero.service";
import { UpdateTrack, UpdateTrackActionTypes, UpdateTrackError, UpdateTrackSuccess } from "./update-track.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { LoadPuzzleHero } from "../../../store/puzzle-admin.actions";

@Injectable()
export class UpdateTrackEffects {
    constructor(private actions$: Actions, private puzzleHeroService: PuzzleHeroService,
                private toastrService: ToastrService, private translateService: TranslateService) {}

    @Effect()
    updateTrack$ = this.actions$.pipe(
        ofType<UpdateTrack>(UpdateTrackActionTypes.UpdateTrack),
        switchMap((action: UpdateTrack) => this.puzzleHeroService.updateTrack(action.id, action.trackFormDto)
            .pipe(
                map(() => new UpdateTrackSuccess()),
                catchError(() => of(new UpdateTrackError()))
            ))
    );


    @Effect()
    updateTrackSuccess$ = this.actions$.pipe(
        ofType<UpdateTrackSuccess>(UpdateTrackActionTypes.UpdateTrackSuccess),
        tap(() => this.toastrService.success("", this.translateService.instant("components.update_track.success"))),
        map(() => new LoadPuzzleHero())
    );
}
