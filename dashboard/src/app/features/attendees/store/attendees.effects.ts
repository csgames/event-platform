import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Attendee } from "../../../api/models/attendee";
import { AttendeeService } from "../../../providers/attendee.service";
import { EventService } from "../../../providers/event.service";
import { map, catchError, switchMap, tap, filter } from "rxjs/operators";
import { GlobalError } from "src/app/store/app.actions";
import { of } from "rxjs";
import { FileUtils } from "../../../utils/file.utils";
import {
    AllResumeDownloaded,
    AttendeesActionTypes, AttendeesLoaded, CsvDownloaded, DownloadAllResume, DownloadCsv, DownloadResume, DownloadXlsx, LoadAttendees,
    ResumeDownloaded,
    XlsxDownloaded
} from "./attendees.actions";

@Injectable()
export class AttendeesEffects {
    constructor(private actions$: Actions,
                private eventService: EventService,
                private attendeeService: AttendeeService) { }

    @Effect()
    loadAttendees$ = this.actions$.pipe(
        ofType<LoadAttendees>(AttendeesActionTypes.LoadAttendees),
        switchMap(() => {
            return this.eventService.getAttendees().pipe(
                map((attendees: Attendee[]) => new AttendeesLoaded(attendees)),
                catchError((e) => of(new GlobalError(e)))
            );
        })
    );

    @Effect()
    downloadCsv$ = this.actions$.pipe(
        ofType<DownloadCsv>(AttendeesActionTypes.DownloadCsv),
        switchMap(() => {
            return this.eventService.getAttendeesData("csv").pipe(
                map((buffer: Blob) => new CsvDownloaded(buffer)),
                catchError((e) => of(new GlobalError(e)))
            );
        })
    );

    @Effect()
    downloadXlsx$ = this.actions$.pipe(
        ofType<DownloadXlsx>(AttendeesActionTypes.DownloadXlsx),
        switchMap(() => {
            return this.eventService.getAttendeesData("xlsx").pipe(
                map((buffer: Blob) => new XlsxDownloaded(buffer)),
                catchError((e) => of(new GlobalError(e)))
            );
        })
    );

    @Effect({ dispatch: false })
    csvDownloaded$ = this.actions$.pipe(
        ofType<CsvDownloaded>(AttendeesActionTypes.CsvDownloaded),
        tap((action: CsvDownloaded) => {
            FileUtils.downloadFile("attendees.csv", action.payload);
        })
    );

    @Effect({ dispatch: false })
    xlsxDownloaded$ = this.actions$.pipe(
        ofType<XlsxDownloaded>(AttendeesActionTypes.XlsxDownloaded),
        tap((action: XlsxDownloaded) => {
            FileUtils.downloadFile("attendees.xlsx", action.payload);
        })
    );

    @Effect()
    downloadResume$ = this.actions$.pipe(
        ofType<DownloadResume>(AttendeesActionTypes.DownloadResume),
        switchMap((action: DownloadResume) => {
            return this.attendeeService.getAttendeeCvLink(action.payload).pipe(
                map((link: string) => new ResumeDownloaded(link)),
                catchError((e) => of(new GlobalError(e)))
            );
        })
    );

    @Effect({ dispatch: false })
    resumeDownloaded$ = this.actions$.pipe(
        ofType<ResumeDownloaded>(AttendeesActionTypes.ResumeDownloaded),
        filter((action: ResumeDownloaded) => action.payload !== null),
        tap((action: ResumeDownloaded) => {
            FileUtils.downloadFromLink(action.payload);
        })
    );

    @Effect()
    downloadAllResume$ = this.actions$.pipe(
        ofType<DownloadAllResume>(AttendeesActionTypes.DownloadAllResume),
        switchMap(() => {
            return this.eventService.getAttendeesCv().pipe(
                map((buffer: Blob) => new AllResumeDownloaded(buffer)),
                catchError((e) => of(new GlobalError(e)))
            );
        })
    );

    @Effect({ dispatch: false })
    allResumeDownloaded$ = this.actions$.pipe(
        ofType<AllResumeDownloaded>(AttendeesActionTypes.AllResumeDownloaded),
        tap((action: AllResumeDownloaded) => {
            FileUtils.downloadFile("resume.zip", action.payload);
        })
    );
}
