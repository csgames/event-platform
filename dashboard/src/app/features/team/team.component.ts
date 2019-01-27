import { Component, OnInit } from "@angular/core";
import { TeamModeleUI } from "./team.model";
import { AttendeeModelUI } from "./attendee/attendee.model";
import { AttendeeComponent } from "./attendee/attendee.component";
import { $ } from "protractor";
import { Store, select } from "@ngrx/store";
import { State, getCurrentTeam, getTeamLoading, getTeamError } from "./store/team.reducer";
import { LoadTeam, UpdateTeamName } from "./store/team.actions";
import { Team } from "src/app/api/models/team";

@Component({
    selector: "app-team",
    templateUrl: "team.template.html",
    styleUrls: ["team.style.scss"]
})
export class TeamComponent implements OnInit {
    
    currentTeam$ = this.store.pipe(select(getCurrentTeam));
    loading$ = this.store.pipe(select(getTeamLoading));
    error$ = this.store.pipe(select(getTeamError));

    isEditing: boolean;

    constructor(private store: Store<State>) { }
    
    ngOnInit() { 
        
        this.isEditing = false;
        
        this.store.dispatch(new LoadTeam());

    }

    public onEdit(): void {
        this.isEditing = true;
        console.log("en edition" + this.isEditing);
    }

    public onSave(currentTeam: Team): void {
        this.isEditing = false;
        this.store.dispatch(new UpdateTeamName(currentTeam.name));
    }
}
