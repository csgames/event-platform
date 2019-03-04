import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Subscription, Observable } from "rxjs";
import { SimpleModalService } from "ngx-simple-modal";
import { State, 
         getCompetitionsLoading,  
         getCompetitionsError,
         getSubscribedCompetitions,
         getNotSubscribedCompetitions
} from "./store/competitions.reducer";
import { Competition } from "src/app/api/models/competition";
import { LoadCompetitions, LoadSubscribedCompetitions } from "./store/competitions.actions";
import { map } from "rxjs/operators";

@Component({
    selector: "app-competitions",
    templateUrl: "competitions.template.html",
    styleUrls: ["competitions.style.scss"]
})
export class CompetitionsComponent implements OnInit {
    loading$ = this.store$.pipe(select(getCompetitionsLoading));
    error$ = this.store$.pipe(select(getCompetitionsError));
    subscribedCompetitions$ = this.store$.pipe(select(getSubscribedCompetitions));
    notSubscribedCompetitions$ = this.store$.pipe(select(getNotSubscribedCompetitions));

    constructor(private store$: Store<State>) {
        this.store$.dispatch(new LoadCompetitions());
        this.store$.dispatch(new LoadSubscribedCompetitions());
    }

    public ngOnInit() { }
}
