import { Action } from "@ngrx/store";
import { Attendee } from "../../../api/models/attendee";

export enum AttendeesActionTypes {
    LoadAttendees = "[Organizers] Load Admins",
    AttendeesLoaded = "[Organizers] Admins loaded",
    DownloadCsv = "[Organizers] Download csv",
    DownloadXlsx = "[Organizers] Download xlsx",
    CsvDownloaded = "[Organizers] Csv downloaded",
    XlsxDownloaded = "[Organizers] Xlsx downloaded"
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

    constructor(public paylaod: Blob) {}
}

export class XlsxDownloaded implements Action {
    readonly type = AttendeesActionTypes.XlsxDownloaded;

    constructor(public paylaod: Blob) {}
}

export type AttendeesActions =
    | LoadAttendees
    | AttendeesLoaded
    | DownloadCsv
    | DownloadXlsx
    | CsvDownloaded
    | XlsxDownloaded;
