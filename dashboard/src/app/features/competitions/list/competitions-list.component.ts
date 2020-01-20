import { Component, OnInit} from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State,
         getCompetitionsLoading,  
         getCompetitionsError,
         getSubscribedCompetitions,
         getNotSubscribedCompetitions} from "./store/competitions-list.reducer";
import { LoadCompetitions} from "./store/competitions-list.actions";

@Component({
    selector: "app-competitions-list",
    templateUrl: "competitions-list.template.html",
    styleUrls: ["competitions-list.style.scss"]
})
export class CompetitionsListComponent implements OnInit {

    loading$ = this.store$.pipe(select(getCompetitionsLoading));
    error$ = this.store$.pipe(select(getCompetitionsError));
    subscribedCompetitions$ = this.store$.pipe(select(getSubscribedCompetitions));
    otherCompetitions$ = this.store$.pipe(select(getNotSubscribedCompetitions));

    constructor(private store$: Store<State>) { }

    public ngOnInit() {
        this.store$.dispatch(new LoadCompetitions());
    }
}
