import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { GuideService } from "../../../../../../providers/guide.service";
import { EditSection, EditSectionActionTypes, EditSectionError, EditSectionSuccess } from "./edit-section.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
import { LoadGuideEdit } from "../../../store/guide-edit.actions";

@Injectable()
export class EditSectionEffects {
    constructor(private actions$: Actions, private guideService: GuideService,
                private toastrService: ToastrService, private translateService: TranslateService) {}

    @Effect()
    editSection$ = this.actions$.pipe(
        ofType<EditSection>(EditSectionActionTypes.EditSection),
        switchMap((action: EditSection) => this.guideService.updateSection(action.eventGuide).pipe(
            map(() => new EditSectionSuccess()),
            catchError(() => of(new EditSectionError()))
        ))
    );

    @Effect()
    editSectionSuccess$ = this.actions$.pipe(
        ofType<EditSectionSuccess>(EditSectionActionTypes.EditSectionSuccess),
        tap(() => this.toastrService.success("", this.translateService.instant("components.section.edit_success"))),
        map(() => new LoadGuideEdit())
    );

    @Effect()
    editSectionError$ = this.actions$.pipe(
        ofType<EditSectionError>(EditSectionActionTypes.EditSectionError),
        tap(() => this.toastrService.error("", this.translateService.instant("components.section.edit_error")))
    );
}
