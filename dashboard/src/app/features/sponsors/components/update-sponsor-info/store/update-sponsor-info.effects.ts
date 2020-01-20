import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { SponsorsService } from "src/app/providers/sponsors.service";
import { ToastrService } from "ngx-toastr";
import { UpdateSponsorInfo, UpdateSponsorInfoActionTypes, UpdateSponsorInfoSuccess } from "./update-sponsor-info.actions";
import { switchMap, map, catchError, tap } from "rxjs/operators";
import { of } from "rxjs";
import { GlobalError } from "src/app/store/app.actions";
import { LoadSponsors } from "../../../sponsor-edit/store/sponsor-edit.actions";

@Injectable()
export class UpdateSponsorInfoEffects {
    constructor(
        private actions$: Actions,
        private sponsorService: SponsorsService,
        private toastr: ToastrService
    ) {}

    @Effect()
    updateSponsorInfo$ = this.actions$.pipe(
        ofType<UpdateSponsorInfo>(UpdateSponsorInfoActionTypes.UpdateSponsorInfo),
        switchMap((action: UpdateSponsorInfo) =>
            this.sponsorService.updateSponsorInfo(action.id, action.dto).pipe(
                map(() => new UpdateSponsorInfoSuccess()),
                catchError((err) => of(new GlobalError(err)))
            )
        )
    );

    @Effect()
    updateSponsorInfoSuccess$ = this.actions$.pipe(
        ofType<UpdateSponsorInfoSuccess>(UpdateSponsorInfoActionTypes.UpdateSponsorInfoSuccess),
        tap(() => this.toastr.success("", "Success")),
        map(() => new LoadSponsors())
    );
}
