import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store"
import { AddAttendeeFormComponent } from "../team/team-view/components/add-attendee-form/add-attendee-form.component";
import { AddAttendeeFormDto } from "./components/add-attendee-form/dto/add-attendee-form.dto";
import { AddAdmin, LoadAdmins } from "./store/organizers.actions";
import { getAttendees, getLoading, State } from "./store/organizers.reducer";

@Component({
    selector: "app-organizers",
    templateUrl: "organizers.template.html",
    styleUrls: ["organizers.style.scss"]
})
export class OrganizersComponent implements OnInit, OnDestroy {
    attendees$ = this.store$.pipe(select(getAttendees));
    loading$ = this.store$.pipe(select(getLoading));

    isAddingTeamMember = false;
    newAttendee: AddAttendeeFormDto;

    @ViewChild("attendee")
    attendeeForm: AddAttendeeFormComponent;

    constructor(private store$: Store<State>) {}

    public ngOnInit() {
        this.store$.dispatch(new LoadAdmins());
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
        this.store$.dispatch(new AddAdmin(this.newAttendee));
    }

    public onCancelTeamMember(): void {
        this.isAddingTeamMember = false;
    }
}
