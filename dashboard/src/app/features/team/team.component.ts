import { Component, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getCurrentTeam, getTeamAttendees, getTeamError, getTeamGodparent, getTeamLoading, State } from "./store/team.reducer";
import { AddTeamGodparent, AddTeamMember, LoadTeam, UpdateTeamName } from "./store/team.actions";
import { Team } from "src/app/api/models/team";
import { Attendee } from "src/app/api/models/attendee";
import { filter, map, withLatestFrom } from "rxjs/operators";
import * as fromApp from "../../store/app.reducers";
import { AddAttendeeFormComponent } from "./add-attendee-form/add-attendee-form.component";
import { Observable } from "rxjs";

@Component({
    selector: "app-team",
    templateUrl: "team.template.html",
    styleUrls: ["team.style.scss"]
})
export class TeamComponent implements OnInit {
    @ViewChild("attendee")
    attendeeForm: AddAttendeeFormComponent;
    @ViewChild("godparent")
    godparentForm: AddAttendeeFormComponent;

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

    get canAddTeamMember$(): Observable<boolean> {
        return this.currentAttendees$.pipe(
            withLatestFrom(this.currentGodparent$, this.currentTeam$),
            map(([attendees, godparent, team]: [Attendee[], Attendee[], Team]) => {
                if (team.attendees.length === team.maxMembersNumber) {
                    return false;
                }

                return !(!godparent.length && team.maxMembersNumber === 11 && attendees.length === 10);
            })
        );
    }

    get canAddTeamGodparent$(): Observable<boolean> {
        return this.currentAttendees$.pipe(
            withLatestFrom(this.currentGodparent$, this.currentTeam$),
            map(([attendees, godparent, team]: [Attendee[], Attendee[], Team]) => {
                return !(team.attendees.length === team.maxMembersNumber || godparent.length);
            })
        );
    }

    get attendeesSize$(): Observable<number> {
        return this.currentAttendees$.pipe(
            withLatestFrom(this.currentGodparent$, this.currentTeam$),
            map(([attendees, godparent, team]: [Attendee[], Attendee[], Team]) => {
                if (team.maxMembersNumber === 11) {
                    return 10;
                }

                return godparent.length ? team.maxMembersNumber - 1 : team.maxMembersNumber;
            })
        );
    }

    get godparentSize$(): Observable<number> {
        return this.currentAttendees$.pipe(
            withLatestFrom(this.currentGodparent$, this.currentTeam$),
            map(([attendees, godparent, team]: [Attendee[], Attendee[], Team]) => {
                if (team.maxMembersNumber === 11) {
                    return 1;
                }

                return godparent.length ? 1 : attendees.length === team.maxMembersNumber ? 0 : 1;
            })
        );
    }

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
        this.isAddingTeamGodparent = false;
        this.newAttendee = this.setDefaultAttendee();
    }

    public onEditTeamGodparent(): void {
        this.isAddingTeamGodparent = true;
        this.isAddingTeamMember = false;
        this.newGodparent = this.setDefaultAttendee();
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
            registered: false,
            handicapped: null,
            needsTransportPass: null
        };
        return newAttendee;
    }

    public onAddTeamMember(): void {
        if (!this.attendeeForm.validate()) {
            return;
        }
        this.isAddingTeamMember = false;
        this.store.dispatch(new AddTeamMember(this.newAttendee));
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

    public onAddTeamGodparent(): void {
        if (!this.godparentForm.validate()) {
            return;
        }
        this.isAddingTeamGodparent = false;
        this.store.dispatch(new AddTeamGodparent(this.newGodparent));
    }
}
