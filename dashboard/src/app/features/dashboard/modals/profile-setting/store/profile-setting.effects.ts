import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { AttendeeUpdated, CvDownloaded, DownloadCv, ProfileSettingActionTypes, UpdateAttendee } from "./profile-setting.actions";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { AttendeeService } from "../providers/attendee.service";
import { of } from "rxjs";
import { GlobalError, LoadCurrentAttendee } from "../../../../../store/app.actions";
import { FileUtils } from "../../../../../utils/file.utils";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class ProfileSettingEffects {
    constructor(private actions$: Actions,
                private attendeeService: AttendeeService,
                private translateService: TranslateService,
                private toastrService: ToastrService) {
    }

    @Effect()
    downloadCv$ = this.actions$.pipe(
        ofType<DownloadCv>(ProfileSettingActionTypes.DownloadCv),
        switchMap(() => {
            return this.attendeeService.getCvLink().pipe(
                map((link: string) => new CvDownloaded(link)),
                catchError(err => of(new GlobalError(err)))
            );
        })
    );

    @Effect({ dispatch: false })
    cvDownloaded$ = this.actions$.pipe(
        ofType<CvDownloaded>(ProfileSettingActionTypes.CvDownloaded),
        tap((action: CvDownloaded) => {
            FileUtils.downloaFromLink(action.payload);
        })
    );

    @Effect()
    updateAttendee$ = this.actions$.pipe(
        ofType<UpdateAttendee>(ProfileSettingActionTypes.UpdateAttendee),
        switchMap((action: UpdateAttendee) => {
            return this.attendeeService.update(action.payload).pipe(
                map(() => new AttendeeUpdated()),
                catchError(err => of(new GlobalError(err)))
            );
        })
    );

    @Effect()
    attendeeUpdated$ = this.actions$.pipe(
        ofType<AttendeeUpdated>(ProfileSettingActionTypes.AttendeeUpdated),
        switchMap(() => {
            return this.translateService.get("components.profile.update_success").pipe(
                map((translation: string) => {
                    this.toastrService.success(translation);
                    return new LoadCurrentAttendee();
                })
            );
        })
    );
}
