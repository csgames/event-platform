import { Component, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Competition } from "../../../api/models/competition";
import {
    getActivities,
    getCompetitionsAdmin,
    getCompetitionsAdminError,
    getCompetitionsAdminLoading, getDirectors,
    State
} from "./store/competition-admin.reducer";
import {
    CreateCompetition, EditCompetition, LoadActivities, LoadCompetitionsAdmin, LoadDirectors
} from "./store/competition-admin.actions";
import { CompetitionFormComponent } from "./components/competition-form/competition-form.component";
import { CompetitionFormDto } from "./components/competition-form/dto/competition-form.dto";

@Component({
    selector: "app-competitions-admin",
    templateUrl: "competitions-admin.template.html",
    styleUrls: ["competitions-admin.style.scss"]

})
export class CompetitionsAdminComponent implements OnInit {
    @ViewChild(CompetitionFormComponent)
    private form: CompetitionFormComponent;

    activities$ = this.store$.pipe(select(getActivities));
    directors$ = this.store$.pipe(select(getDirectors));
    competitions$ = this.store$.pipe(select(getCompetitionsAdmin));
    loading$ = this.store$.pipe(select(getCompetitionsAdminLoading));
    error$ = this.store$.pipe(select(getCompetitionsAdminError));

    public dto = new CompetitionFormDto();
    public showCreateCompetitionCard = false;

    constructor(private store$: Store<State>) { }

    ngOnInit() {
        this.store$.dispatch(new LoadCompetitionsAdmin());
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
}
