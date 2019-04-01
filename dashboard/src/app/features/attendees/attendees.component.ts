import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { filter, map } from "rxjs/operators";
import { Attendee } from "../../api/models/attendee";
import { DownloadCsv, DownloadXlsx, LoadAttendees } from "./store/attendees.actions";
import { getAttendees, getLoading, State } from "./store/attendees.reducer";

@Component({
    selector: "app-attendees",
    templateUrl: "attendees.template.html",
    styleUrls: ["attendees.style.scss"]
})
export class AttendeesComponent implements OnInit, OnDestroy {
    attendees$ = this.store$.pipe(select(getAttendees));
    loading$ = this.store$.pipe(select(getLoading));
    searchInput = "";

    get sortedFilteredAttendees$() {
        return this.attendees$.pipe(
            filter(x => x !== null),
            map(t => t.filter((attendee: Attendee) => {
                const words = this.searchInput
                    .toLowerCase()
                    .split(" ")
                    .filter(x => x.length > 0);
                if (!words || !words.length) {
                    return true;
                }
                const data = [
                    attendee.firstName,
                    attendee.lastName,
                    attendee.email,
                    (attendee as any).team,
                    (attendee as any).school,
                    (attendee as any).registered ? "registered" : "not",
                ].filter(x => x)
                    .map(x => x.toLowerCase());
                let count = 0;
                for (const word of words) {
                    count += data.filter(x => x !== null).filter(x => x.includes(word)).length > 0 ? 1 : 0;
                }
                return count === words.length;
            }))
        );
    }

    constructor(private store$: Store<State>, private router: Router) {
    }

    public ngOnInit() {
        this.store$.dispatch(new LoadAttendees());
    }

    public ngOnDestroy() {
    }

    public downloadData(type: string) {
        if (type === "csv") {
            this.store$.dispatch(new DownloadCsv());
        } else if (type === "xlsx") {
            this.store$.dispatch(new DownloadXlsx());
        }
    }

    public viewTeam(teamId: string) {
        this.router.navigate([`/team/${teamId}`]);
    }
}
