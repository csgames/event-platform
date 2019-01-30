import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State, getCurrentTeam, getTeamLoading, getTeamError, getTeamGodparent, getTeamAttendees } from "./store/team.reducer";
import { LoadTeam, UpdateTeamName, AddTeamMember, AddTeamGodparent } from "./store/team.actions";
import { Team } from "src/app/api/models/team";
import { Attendee } from "src/app/api/models/attendee";
import { first, filter } from "rxjs/operators";
import * as fromApp from "../../store/app.reducers";

@Component({
    selector: "app-team",
    templateUrl: "team.template.html",
    styleUrls: ["team.style.scss"]
})
export class TeamComponent implements OnInit {
    
    currentTeam$ = this.store.pipe(select(getCurrentTeam));
    loading$ = this.store.pipe(select(getTeamLoading));
    error$ = this.store.pipe(select(getTeamError));
    currentAttendee$ = this.store.pipe(select(fromApp.getCurrentAttendee));
    currentEvent$ = this.store.pipe(select(fromApp.getCurrentEvent));
    currentGodparent$ = this.store.pipe(select(getTeamGodparent));
    currentAttendees$ = this.store.pipe(select(getTeamAttendees));

    isEditingTeamName: boolean;
    isAddingTeamMember: boolean;
    isAddingTeamGodparent: boolean;
    newAttendee: Attendee;
    newGodparent: Attendee;
    teamName: string;

    constructor(private store: Store<State>) { }
    
    ngOnInit() { 
        
        this.isEditingTeamName = false;
        this.isAddingTeamMember = false;
        this.isAddingTeamGodparent = false;
        this.currentEvent$.pipe(filter((e) => !!e)).subscribe(() => {
            this.store.dispatch(new LoadTeam());
        });

        this.newAttendee = this.setDefaultAttendee();
        this.newGodparent = this.setDefaultAttendee();
    }

    public onEditTeamName(currentTeam: Team): void {
        this.isEditingTeamName = true;
        this.teamName = currentTeam.name;
    }

    public onSaveTeamName(teamName: string): void {
        this.isEditingTeamName = false;
        this.store.dispatch(new UpdateTeamName(teamName));
    }

    public onEditTeamMember(): void {
        this.isAddingTeamMember = true;
        this.setDefaultAttendee();
    }

    public onEditTeamGodparent(): void {
        this.isAddingTeamGodparent = true;
        this.setDefaultAttendee();
    }

    public setDefaultAttendee(): Attendee {
        const newAttendee = {
            firstName: "",
            lastName: "",
            email: "",
            github: "",
            linkedIn: "",
            cv: "",
            website: "",
            gender: "",
            tshirt: "",
            phoneNumber: "",
            acceptSMSNotifications: null,
            hasDietaryRestrictions: null,
            dietaryRestrictions: null,
            registered: false
        };
        return newAttendee;
    }

    public onAddTeamMember(newAttendee: Attendee): void {
        this.isAddingTeamMember = false;
        this.store.dispatch(new AddTeamMember({
            newAttendee,
            role: "attendee"
        }));
    }

    public onCancelTeamName(): void {
        this.isEditingTeamName = false;
        this.store.dispatch(new LoadTeam());
    }

    public onCancelTeamMember(): void {
        this.isAddingTeamMember = false;
    }

    public onCancelTeamGodparent(): void {
        this.isAddingTeamGodparent = false;
    }

    public onAddTeamGodparent(newGodparent: Attendee): void {
        this.isAddingTeamGodparent = false;
        this.store.dispatch(new AddTeamGodparent({
            newGodparent,
            role: "godfather"
        }));
    }
}
