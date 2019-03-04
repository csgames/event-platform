import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { PuzzleHeroService } from "../../../../../../providers/puzzle-hero.service";
import { CreateTrack, CreateTrackActionTypes, CreateTrackError, CreateTrackSuccess } from "./create-track.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { LoadPuzzleHero } from "../../../store/puzzle-admin.actions";

@Injectable()
export class CreateTrackEffects {
    constructor(private actions$: Actions, private puzzleHeroService: PuzzleHeroService,
                private toastrService: ToastrService, private translateService: TranslateService) {}

    @Effect()
    createTrack$ = this.actions$.pipe(
        ofType<CreateTrack>(CreateTrackActionTypes.CreateTrack),
        switchMap((action: CreateTrack) => this.puzzleHeroService.createTrack(action.trackFormDto).pipe(
            map(() => new CreateTrackSuccess()),
            catchError(() => of(new CreateTrackError()))
        ))
    );


    @Effect()
    createTrackSuccess$ = this.actions$.pipe(
        ofType<CreateTrackSuccess>(CreateTrackActionTypes.CreateTrackSuccess),
        tap(() => this.toastrService.success("", this.translateService.instant("components.create_track.success"))),
        map(() => new LoadPuzzleHero())
    );
}
