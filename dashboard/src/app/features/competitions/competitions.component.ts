import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Subscription } from "rxjs";
import { SimpleModalService } from "ngx-simple-modal";
import { State, getCompetitionsLoading, getCompetitions, getCompetitionsError } from "./store/competitions.reducer";
import { Competition } from "src/app/api/models/competition";
import { LoadCompetitions } from "./store/competitions.actions";

@Component({
    selector: "app-competitions",
    templateUrl: "competitions.template.html",
    styleUrls: ["competitions.style.scss"]
})
export class CompetitionsComponent implements OnInit {
    competitions$ = this.store$.pipe(select(getCompetitions));
    // loading$ = this.store$.pipe(select(getCompetitionsLoading));
    // error$ = this.store$.pipe(select(getCompetitionsError));

    constructor(private store$: Store<State>,
                private modalService: SimpleModalService) {}


    public ngOnInit() {
        this.store$.dispatch(new LoadCompetitions());
    }
}
