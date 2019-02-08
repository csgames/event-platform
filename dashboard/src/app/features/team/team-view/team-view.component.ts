import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State, getCurrentTeam, getTeamLoading, getTeamError, getTeamGodparent, getTeamAttendees } from "./store/team-view.reducer";
import { LoadTeam, UpdateTeamName, AddTeamMember, AddTeamGodparent } from "./store/team-view.actions";
import { Team } from "src/app/api/models/team";
import { Attendee } from "src/app/api/models/attendee";
import { filter, map, withLatestFrom } from "rxjs/operators";
import * as fromApp from "../../../store/app.reducers";
import { AddAttendeeFormComponent } from "./components/add-attendee-form/add-attendee-form.component";
import { Observable } from "rxjs";

@Component({
    selector: "app-team-view",
    templateUrl: "./team-view.template.html",
    styleUrls: ["./team-view.style.scss"]
})
export class TeamViewComponent implements OnInit {
    @Input()
    set teamId(value: string) {
        this.currentEvent$.pipe(filter((e) => !!e)).subscribe(() => {
            this.store.dispatch(new LoadTeam(value));
        });
    }

    @Input()
    set loadAttendeeTeam(value: boolean) {
        if (value) {
            this.currentEvent$.pipe(filter((e) => !!e)).subscribe(() => {
                this.store.dispatch(new LoadTeam());
            });
        }
    }

    @ViewChild("attendee")
    attendeeForm: AddAttendeeFormComponent;
    @ViewChild("godparent")
    godparentForm: AddAttendeeFormComponent;

    currentTeam$ = this.store.pipe(select(getCurrentTeam));
    loading$ = this.store.pipe(select(getTeamLoading));
    error$ = this.store.pipe(select(getTeamError));
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
            filter(([attendees, godparent, team]: [Attendee[], Attendee[], Team]) => !!attendees && !!godparent && !!team),
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
            filter(([attendees, godparent, team]: [Attendee[], Attendee[], Team]) => !!attendees && !!godparent && !!team),
            map(([attendees, godparent, team]: [Attendee[], Attendee[], Team]) => {
                return !(team.attendees.length === team.maxMembersNumber || godparent.length);
            })
        );
    }

    get attendeesSize$(): Observable<number> {
        return this.currentAttendees$.pipe(
            withLatestFrom(this.currentGodparent$, this.currentTeam$),
            filter(([attendees, godparent, team]: [Attendee[], Attendee[], Team]) => !!attendees && !!godparent && !!team),
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
            filter(([attendees, godparent, team]: [Attendee[], Attendee[], Team]) => !!attendees && !!godparent && !!team),
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

        this.newAttendee = this.setDefaultAttendee();
        this.newGodparent = this.setDefaultAttendee();
    }

    public onEditTeamName(currentTeam: Team): void {
        this.isEditingTeamName = true;
        this.teamName = currentTeam.name;
    }

    public onSaveTeamName(teamName: string): void {
        this.isEditingTeamName = false;
        if (teamName.length > 0) {
            this.store.dispatch(new UpdateTeamName(teamName));
        }
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
