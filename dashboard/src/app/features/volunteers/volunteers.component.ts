import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getAttendees, getLoading, State } from "./store/volunteers.reducer";
import { AddVolunteer, LoadVolunteers } from "./store/volunteers.actions";
import { RegisterAttendeeFormDto } from "../../components/register-attendee-form/dto/register-attendee-form.dto";
import { RegisterAttendeeFormComponent } from "../../components/register-attendee-form/register-attendee-form.component";

@Component({
    selector: "app-organizers",
    templateUrl: "volunteers.template.html",
    styleUrls: ["volunteers.style.scss"]
})
export class VolunteersComponent implements OnInit, OnDestroy {
    attendees$ = this.store$.pipe(select(getAttendees));
    loading$ = this.store$.pipe(select(getLoading));

    isAddingTeamMember = false;
    newAttendee: RegisterAttendeeFormDto;

    @ViewChild(RegisterAttendeeFormComponent)
    attendeeForm: RegisterAttendeeFormComponent;

    constructor(private store$: Store<State>) {}

    public ngOnInit() {
        this.store$.dispatch(new LoadVolunteers());
    }

    public ngOnDestroy() {
    }

    public onEditTeamMember(): void {
        this.isAddingTeamMember = true;
        this.newAttendee = this.setDefaultAttendee();
    }

    public setDefaultAttendee(): RegisterAttendeeFormDto {
        return {
            firstName: "",
            lastName: "",
            password: "",
            email: ""
        };
    }

    public onAddTeamMember(): void {
        if (!this.attendeeForm.validate()) {
            return;
        }
        this.isAddingTeamMember = false;
        this.store$.dispatch(new AddVolunteer(this.newAttendee));
    }

    public onCancelTeamMember(): void {
        this.isAddingTeamMember = false;
    }
}
