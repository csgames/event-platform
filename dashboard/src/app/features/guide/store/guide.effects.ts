import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { LoadGuide, GuideLoaded, GuideActionTypes } from "./guide.actions";
import { map, catchError, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { EventService } from "src/app/providers/event.service";
import { GlobalError } from "src/app/store/app.actions";

@Injectable()
export class GuideEffects {
    constructor(
        private actions$: Actions,
        private eventService: EventService
    ) {}

    @Effect()
    guide$ = this.actions$.pipe(
        ofType<LoadGuide>(GuideActionTypes.LoadGuide),
        switchMap((action: LoadGuide) =>
            this.eventService.getGuideEvent().pipe(
                map((guide) => new GuideLoaded(guide)),
                catchError((error) => of(new GlobalError(error)))
            )
        )
    );    
}
