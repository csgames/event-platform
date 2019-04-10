import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { GuideService } from "../../../../../../providers/guide.service";
import { CreateSection, CreateSectionActionTypes, CreateSectionError, CreateSectionSuccess } from "./create-section.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { LoadGuideEdit } from "../../../store/guide-edit.actions";

@Injectable()
export class CreateSectionEffects {
    constructor(private actions$: Actions, private guideService: GuideService,
                private toastrService: ToastrService, private translateService: TranslateService) {}

    @Effect()
    createSection$ = this.actions$.pipe(
        ofType<CreateSection>(CreateSectionActionTypes.CreateSection),
        switchMap((action: CreateSection) => this.guideService.createSection(action.sectionFormDto).pipe(
            map(() => new CreateSectionSuccess()),
            catchError(() => of(new CreateSectionError()))
        ))
    );

    @Effect()
    createSectionSuccess$ = this.actions$.pipe(
        ofType<CreateSectionSuccess>(CreateSectionActionTypes.CreateSectionSuccess),
        tap(() => this.toastrService.success("", this.translateService.instant("components.section.create_success"))),
        map(() => new LoadGuideEdit())
    );
}
