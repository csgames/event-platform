import { Component, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getActivities, State } from "./store/competition-admin.reducer";
import { LoadActivities } from "./store/competition-admin.actions";
import { CompetitionFormDto } from "./components/competition-form/dto/competition-form.dto";
import { CompetitionFormComponent } from "./components/competition-form/competition-form.component";

@Component({
    selector: "app-competitions-admin",
    templateUrl: "competitions-admin.template.html",
    styleUrls: ["competitions-admin.style.scss"]

})
export class CompetitionsAdminComponent implements OnInit {
    @ViewChild(CompetitionFormComponent)
    private form: CompetitionFormComponent;

    activities$ = this.store$.pipe(select(getActivities));

    public dto = new CompetitionFormDto();
    public showCreateCompetitionCard = false;

    constructor(private store$: Store<State>) { }

    public ngOnInit() {
        this.store$.dispatch(new LoadActivities());
    }

    public clickAddCompetition() {
        this.showCreateCompetitionCard = true;
    }

    public onCancelCompetition() {
        this.dto = new CompetitionFormDto();
        this.showCreateCompetitionCard = false;
    }

    public onAdd() {
        /*if (!this.form.validate()) {
            return;
        }
        this.store$.dispatch(new AddFlashout(this.dto));*/
        this.onCancelCompetition();
    }
}
