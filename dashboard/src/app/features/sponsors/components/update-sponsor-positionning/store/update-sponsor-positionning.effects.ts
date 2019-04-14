import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { SponsorsService } from "src/app/providers/sponsors.service";
import { ToastrService } from "ngx-toastr";
import { UpdatePositionning, UpdatePositionningSuccess, UpdateSponsorPositionningActionTypes } from "./update-sponsor-positionning.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { GlobalError } from "src/app/store/app.actions";
import { LoadSponsors } from "../../../sponsor-edit/store/sponsor-edit.actions";

@Injectable()
export class UpdateSponsorPositionningEffects {
    constructor(
        private actions$: Actions,
        private sponsorService: SponsorsService,
        private toastr: ToastrService
    ) {}

    @Effect()
    updateSponsorPositionning$ = this.actions$.pipe(
        ofType<UpdatePositionning>(UpdateSponsorPositionningActionTypes.UpdatePositionning),
        switchMap((action: UpdatePositionning) =>
            this.sponsorService.updateSponsorPositionning(action.id, action.tier, action.dto).pipe(
                map(() => new UpdatePositionningSuccess()),
                catchError((err) => of(new GlobalError(err)))
            )
        )
    );

    @Effect()
    updateSponsorPositionningSuccess$ = this.actions$.pipe(
        ofType<UpdatePositionningSuccess>(UpdateSponsorPositionningActionTypes.UpdatePositionningSuccess),
        tap(() => this.toastr.success("", "Success")),
        map(() => new LoadSponsors())
    );
}
