import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AddAttendeeFormDto } from "./components/add-attendee-form/dto/add-attendee-form.dto";
import { getAttendees, getLoading, State } from "./store/volunteers.reducer";
import { AddAttendeeFormComponent } from "./components/add-attendee-form/add-attendee-form.component";
import { AddVolunteer, LoadVolunteers } from "./store/volunteers.actions";

@Component({
    selector: "app-organizers",
    templateUrl: "volunteers.template.html",
    styleUrls: ["volunteers.style.scss"]
})
export class VolunteersComponent implements OnInit, OnDestroy {
    attendees$ = this.store$.pipe(select(getAttendees));
    loading$ = this.store$.pipe(select(getLoading));

    isAddingTeamMember = false;
    newAttendee: AddAttendeeFormDto;

    @ViewChild("attendee")
    attendeeForm: AddAttendeeFormComponent;

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

    public setDefaultAttendee(): AddAttendeeFormDto {
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
