import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { LoadGuideEdit, GuideEditLoaded, GuideEditActionTypes } from "./guide-edit.actions";
import { map, catchError, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { EventService } from "src/app/providers/event.service";
import { GlobalError } from "src/app/store/app.actions";

@Injectable()
export class GuideEditEffects {
    constructor(
        private actions$: Actions,
        private eventService: EventService
    ) {}

    @Effect()
    guide$ = this.actions$.pipe(
        ofType<LoadGuideEdit>(GuideEditActionTypes.LoadGuideEdit),
        switchMap((action: LoadGuideEdit) =>
            this.eventService.getGuideEvent().pipe(
                map((guide) => new GuideEditLoaded(guide)),
                catchError((error) => of(new GlobalError(error)))
            )
        )
    );    
}
