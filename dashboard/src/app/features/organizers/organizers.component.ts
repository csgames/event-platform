import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { AddAdmin, LoadAdmins } from "./store/organizers.actions";
import { getAttendees, getLoading, State } from "./store/organizers.reducer";
import { RegisterAttendeeFormComponent } from "../../components/register-attendee-form/register-attendee-form.component";
import { RegisterAttendeeFormDto } from "../../components/register-attendee-form/dto/register-attendee-form.dto";

@Component({
    selector: "app-organizers",
    templateUrl: "organizers.template.html",
    styleUrls: ["organizers.style.scss"]
})
export class OrganizersComponent implements OnInit, OnDestroy {
    attendees$ = this.store$.pipe(select(getAttendees));
    loading$ = this.store$.pipe(select(getLoading));

    isAddingTeamMember = false;
    newAttendee: RegisterAttendeeFormDto;

    @ViewChild(RegisterAttendeeFormComponent)
    attendeeForm: RegisterAttendeeFormComponent;

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
        this.store$.dispatch(new AddAdmin(this.newAttendee));
    }

    public onCancelTeamMember(): void {
        this.isAddingTeamMember = false;
    }
}
