import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { SponsorsService } from "src/app/providers/sponsors.service";
import { LoadSponsors, SponsorEditActionTypes, SponsorsLoaded, AddSponsor } from "./sponsor-edit.actions";
import { switchMap, catchError, map } from "rxjs/operators";
import { Sponsors } from "src/app/api/models/sponsors";
import { of } from "rxjs";
import { GlobalError } from "src/app/store/app.actions";

@Injectable()
export class SponsorEditEffects {
    constructor(
        private actions$: Actions,
        private sponsorService: SponsorsService
    ) {}

    @Effect()
    loadSponsors$ = this.actions$.pipe(
        ofType<LoadSponsors>(SponsorEditActionTypes.LoadSponsors),
        switchMap(() => this.sponsorService.getSponsorsList().pipe(
                map((s: { [id: string]: Sponsors[] }) => new SponsorsLoaded(s)),
                catchError((e) => of(new GlobalError(e)))
            )
        )
    );

    @Effect()
    addSponsor$ = this.actions$.pipe(
        ofType<AddSponsor>(SponsorEditActionTypes.AddSponsor),
        switchMap((action: AddSponsor) =>
            this.sponsorService.addSponsor(action.dto, action.tier).pipe(
                map(() => new LoadSponsors()),
                catchError((err) => of(new GlobalError(err)))
            )
        )
    );
}
