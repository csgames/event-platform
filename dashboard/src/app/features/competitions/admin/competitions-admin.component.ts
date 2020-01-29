import { Component, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Competition } from "../../../api/models/competition";
import {
    getActivities,
    getCompetitionsAdmin,
    getCompetitionsAdminError,
    getCompetitionsAdminLoading,
    getDirectors,
    getEventScore,
    State
} from "./store/competition-admin.reducer";
import {
    CreateCompetition, EditCompetition, LoadActivities, LoadCompetitionsAdmin, LoadDirectors, LoadEventScore
} from "./store/competition-admin.actions";
import { CompetitionFormComponent } from "./components/competition-form/competition-form.component";
import { CompetitionFormDto } from "./components/competition-form/dto/competition-form.dto";
import { getCurrentAttendee, getCurrentEvent } from "src/app/store/app.reducers";
import { Event } from "../../../api/models/event";
import { SimpleModalService } from "ngx-simple-modal";
import { CompetitionSettingsComponent } from "./components/competition-settings/competition-settings.components";

@Component({
    selector: "app-competitions-admin",
    templateUrl: "competitions-admin.template.html",
    styleUrls: ["competitions-admin.style.scss"]

})
export class CompetitionsAdminComponent implements OnInit {
    @ViewChild(CompetitionFormComponent, { static: true })
    private form: CompetitionFormComponent;

    activities$ = this.store$.pipe(select(getActivities));
    directors$ = this.store$.pipe(select(getDirectors));
    competitions$ = this.store$.pipe(select(getCompetitionsAdmin));
    eventScore$ = this.store$.pipe(select(getEventScore));
    loading$ = this.store$.pipe(select(getCompetitionsAdminLoading));
    error$ = this.store$.pipe(select(getCompetitionsAdminError));
    attendee$ = this.store$.pipe(select(getCurrentAttendee));
    event$ = this.store$.pipe(select(getCurrentEvent));

    public dto = new CompetitionFormDto();
    public showCreateCompetitionCard = false;

    constructor(private store$: Store<State>,
                private modalService: SimpleModalService) { }

    ngOnInit() {
        this.store$.dispatch(new LoadCompetitionsAdmin());
        this.store$.dispatch(new LoadEventScore());
        this.store$.dispatch(new LoadActivities());
        this.store$.dispatch(new LoadDirectors());
    }

    public clickAddCompetition() {
        this.showCreateCompetitionCard = true;
    }

    public onCancelCompetition() {
        this.dto = new CompetitionFormDto();
        this.showCreateCompetitionCard = false;
    }

    public onAdd() {
        if (!this.form.validate()) {
            return;
        }
        this.store$.dispatch(new CreateCompetition(this.dto));
        this.onCancelCompetition();
    }

    public onEdit(competition: Competition) {
        this.store$.dispatch(new EditCompetition(competition));
    }

    clickSettings(event: Event) {
        this.modalService.addModal(CompetitionSettingsComponent, { event });
    }
}
