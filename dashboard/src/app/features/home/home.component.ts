import { Component, OnInit } from "@angular/core";
import * as fromHome from "./store/home.reducers";
import { select, Store } from "@ngrx/store";
import { LoadTeams } from "./store/home.actions";

@Component({
    selector: "app-home",
    templateUrl: "home.template.html"
})

export class HomeComponent implements OnInit {

    public loading$ = this.store$.pipe(select(fromHome.getLoading));
    public error$ = this.store$.pipe(select(fromHome.getError));
    public teams$ = this.store$.pipe(select(fromHome.getTeams));

    constructor(private store$: Store<fromHome.State>) { }

    ngOnInit() {
        this.store$.dispatch(new LoadTeams());
    }
}
