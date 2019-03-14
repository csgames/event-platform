import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getActivities, 
         State, 
         getCompetitionsAdminLoading, 
         getCompetitionsAdminError, 
         getCompetitionsAdmin } from "./store/competition-admin.reducer";
import { LoadActivities, LoadCompetitionsAdmin } from "./store/competition-admin.actions";

@Component({
    selector: "app-competitions-admin",
    templateUrl: "competitions-admin.template.html",
    styleUrls: ["competitions-admin.style.scss"]

})
export class CompetitionsAdminComponent implements OnInit {
    activities$ = this.store$.pipe(select(getActivities));
    competitions$ = this.store$.pipe(select(getCompetitionsAdmin));
    loading$ = this.store$.pipe(select(getCompetitionsAdminLoading));
    error$ = this.store$.pipe(select(getCompetitionsAdminError));
    
    constructor(private store$: Store<State>) { }

    ngOnInit() {
        this.store$.dispatch(new LoadCompetitionsAdmin());
        this.store$.dispatch(new LoadActivities());
    }
        
}
