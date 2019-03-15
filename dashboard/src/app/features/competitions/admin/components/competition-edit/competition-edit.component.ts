import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Subscription } from "rxjs";
import { Competition } from "src/app/api/models/competition";
import { CompetitionFormComponent } from "../competition-form/competition-form.component";
import { CompetitionFormDto } from "../competition-form/dto/competition-form.dto";
import { LoadActivities, LoadDirectors, ResetStore, SaveCompetitionEdit } from "./store/competition-edit.actions";
import { getActivities, getCompetitionEditLoading, getCompetitionEditSuccess, getDirectors, State } from "./store/competition-edit.reducer";

export interface CompetitionEditModal {
    competition: Competition;
}

@Component({
    selector: "app-competition-edit",
    templateUrl: "competition-edit.template.html",
    styleUrls: ["./competition-edit.style.scss"]
})
export class CompetitionEditComponent extends SimpleModalComponent<CompetitionEditModal, boolean> implements OnInit, OnDestroy {
    @ViewChild(CompetitionFormComponent)
    private form: CompetitionFormComponent;

    activities$ = this.store$.pipe(select(getActivities));
    directors$ = this.store$.pipe(select(getDirectors));
    loading$ = this.store$.pipe(select(getCompetitionEditLoading));
    success$ = this.store$.pipe(select(getCompetitionEditSuccess));

    public competition: Competition;
    public dto = new CompetitionFormDto();
    private successSub$: Subscription;

    constructor(private store$: Store<State>) {
        super();
    }

    public ngOnInit() {
        this.store$.dispatch(new ResetStore());
        this.store$.dispatch(new LoadActivities());
        this.store$.dispatch(new LoadDirectors());
        this.dto = {
            ...this.competition,
            activities: this.competition.activities.map(x => x._id) as any,
            directors: this.competition.directors.map(x => x._id) as any
        };
        this.successSub$ = this.success$.subscribe(success => {
            if (success) {
                this.result = true;
                this.close();
            }
        });
    }

    public ngOnDestroy() {
        this.successSub$.unsubscribe();
        super.ngOnDestroy();
    }

    public onClose() {
        this.result = false;
        this.close();
    }

    public clickSave() {
        if (this.form.validate()) {
            this.store$.dispatch(new SaveCompetitionEdit({
                id: this.competition._id,
                dto: this.dto
            }));
        }
    }
}
