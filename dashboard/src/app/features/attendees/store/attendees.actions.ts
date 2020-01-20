import { Action } from "@ngrx/store";
import { Attendee } from "../../../api/models/attendee";

export enum AttendeesActionTypes {
    LoadAttendees = "[Attendees] Load Attendees",
    AttendeesLoaded = "[Attendees] Attendees loaded",
    DownloadCsv = "[Attendees] Download csv",
    DownloadXlsx = "[Attendees] Download xlsx",
    CsvDownloaded = "[Attendees] Csv downloaded",
    XlsxDownloaded = "[Attendees] Xlsx downloaded",
    DownloadResume = "[Attendees] Download resume",
    ResumeDownloaded = "[Attendees] Resume downloaded",
    DownloadAllResume = "[Attendees] Download all resume",
    AllResumeDownloaded = "[Attendees] All resume downloaded"
}

export class LoadAttendees implements Action {
    readonly type = AttendeesActionTypes.LoadAttendees;
}

export class AttendeesLoaded implements Action {
    readonly type = AttendeesActionTypes.AttendeesLoaded;

    constructor(public payload: Attendee[]) {}
}

export class DownloadCsv implements Action {
    readonly type = AttendeesActionTypes.DownloadCsv;
}

export class DownloadXlsx implements Action {
    readonly type = AttendeesActionTypes.DownloadXlsx;
}

export class CsvDownloaded implements Action {
    readonly type = AttendeesActionTypes.CsvDownloaded;

    constructor(public payload: Blob) {}
}

export class XlsxDownloaded implements Action {
    readonly type = AttendeesActionTypes.XlsxDownloaded;

    constructor(public payload: Blob) {}
}

export class DownloadResume implements Action {
    readonly type = AttendeesActionTypes.DownloadResume;

    constructor(public payload: string) {}
}


export class ResumeDownloaded implements Action {
    readonly type = AttendeesActionTypes.ResumeDownloaded;

    constructor(public payload: string) {}
}

export class DownloadAllResume implements Action {
    readonly type = AttendeesActionTypes.DownloadAllResume;
}


export class AllResumeDownloaded implements Action {
    readonly type = AttendeesActionTypes.AllResumeDownloaded;

    constructor(public payload: Blob) {}
}

export type AttendeesActions =
    | LoadAttendees
    | AttendeesLoaded
    | DownloadCsv
    | DownloadXlsx
    | CsvDownloaded
    | XlsxDownloaded
    | DownloadResume
    | ResumeDownloaded
    | DownloadAllResume
    | AllResumeDownloaded;
