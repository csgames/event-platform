import { Component, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getActivities, State } from "./store/competition-admin.reducer";
import { LoadActivities } from "./store/competition-admin.actions";

@Component({
    selector: "app-competitions-admin",
    templateUrl: "competitions-admin.template.html",
    styleUrls: ["competitions-admin.style.scss"]

})
export class CompetitionsAdminComponent implements OnInit {
    activities$ = this.store$.pipe(select(getActivities));

    constructor(private store$: Store<State>) { }

    public ngOnInit() {
        this.store$.dispatch(new LoadActivities());
    }
}
