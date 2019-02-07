import { Component, OnInit } from "@angular/core";
import { getTeamEditLoading, getTeamEditTeams, State } from "./store/team-edit.reducer";
import { select, Store } from "@ngrx/store";
import { LoadTeams } from "./store/team-edit.actions";
import { Attendee } from "../../../api/models/attendee";
import { Team } from "../../../api/models/team";
import { map } from "rxjs/operators";

@Component({
    selector: "app-team-edit",
    templateUrl: "team-edit.template.html",
    styleUrls: ["./team-edit.style.scss"]
})
export class TeamEditComponent implements OnInit {
    teams$ = this.store$.pipe(select(getTeamEditTeams));
    loading$ = this.store$.pipe(select(getTeamEditLoading));

    get sortedTeams$() {
        return this.teams$.pipe(
            map(t => t.sort((a, b) => b.attendees.length - a.attendees.length))
        );
    }

    constructor(private store$: Store<State>) {
    }

    ngOnInit() {
        this.store$.dispatch(new LoadTeams());
    }

    getTeamCaptain(team: Team): Attendee {
        return team && team.attendees && team.attendees.find(a => a.role === "captain");
    }

    getTeamAttendees(team: Team): Attendee[] {
        return team && team.attendees && team.attendees.filter(a => ["attendee", "captain"].includes(a.role));
    }

    getTeamGodparent(team: Team): Attendee[] {
        return team && team.attendees && team.attendees.filter(a => ["godparent"].includes(a.role));
    }
}
