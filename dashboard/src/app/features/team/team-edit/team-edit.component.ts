import { Component, OnInit, ViewChild } from "@angular/core";
import { getTeamEditError, getTeamEditLoading, getTeamEditTeams, getTeamSchools, getTeamSponsors, State } from "./store/team-edit.reducer";
import { select, Store } from "@ngrx/store";
import { AddTeam, EditTeam, LoadSchools, LoadSponsors, LoadTeams } from "./store/team-edit.actions";
import { Attendee } from "../../../api/models/attendee";
import { Team } from "../../../api/models/team";
import { map } from "rxjs/operators";
import { AddTeamFormDto } from "./components/add-team-form/dto/add-team-form.dto";
import { AddTeamFormComponent } from "./components/add-team-form/add-team-form.component";

@Component({
    selector: "app-team-edit",
    templateUrl: "team-edit.template.html",
    styleUrls: ["./team-edit.style.scss"]
})
export class TeamEditComponent implements OnInit {
    teams$ = this.store$.pipe(select(getTeamEditTeams));
    loading$ = this.store$.pipe(select(getTeamEditLoading));
    error$ = this.store$.pipe(select(getTeamEditError));

    schools$ = this.store$.pipe(select(getTeamSchools));
    sponsors$ = this.store$.pipe(select(getTeamSponsors));

    showCreateTeamCard = false;

    newTeamDto = new AddTeamFormDto();

    @ViewChild(AddTeamFormComponent, { static: false })
    teamForm: AddTeamFormComponent;

    searchInput = "";

    get sortedFilteredTeams$() {
        return this.teams$.pipe(
            map(t => t.filter((team: Team) => team.name.toLowerCase().includes(this.searchInput.toLowerCase()))),
            map(t => t.sort((a, b) => b.attendees.length - a.attendees.length))
        );
    }

    constructor(private store$: Store<State>) {
    }

    ngOnInit() {
        this.store$.dispatch(new LoadTeams());
        this.store$.dispatch(new LoadSchools());
        this.store$.dispatch(new LoadSponsors());
        this.newTeamDto.showOnScoreboard = true;
    }

    getTeamCaptain(team: Team): Attendee {
        return team && team.attendees && team.attendees.find(a => a.role === "captain") || team.attendees[0];
    }

    getTeamAttendees(team: Team): Attendee[] {
        return team && team.attendees && team.attendees.filter(a => ["attendee", "captain"].includes(a.role));
    }

    getTeamGodparent(team: Team): Attendee[] {
        return team && team.attendees && team.attendees.filter(a => ["godparent"].includes(a.role));
    }

    areTeamMembersAllRegistered(team: Team): boolean {
        return this.getTeamAttendees(team).every(a => a.registered);
    }

    clickCreateTeam() {
        this.showCreateTeamCard = true;
    }

    onEditNewTeam(teamDto: AddTeamFormDto) {
        this.newTeamDto = teamDto;
    }

    onAddTeam() {
        if (this.teamForm.validate()) {
            this.store$.dispatch(new AddTeam(this.newTeamDto));
            this.newTeamDto = new AddTeamFormDto();
            this.showCreateTeamCard = false;
        }
    }

    onCancelTeam() {
        this.newTeamDto = new AddTeamFormDto();
        this.showCreateTeamCard = false;
    }

    onEdit(team: Team) {
        this.store$.dispatch(new EditTeam(team));
    }
}
