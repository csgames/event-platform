import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { Competition } from "src/app/api/models/competition";
import { getCompetitionsAdminLoading, State } from "../../store/competition-admin.reducer";
import { Router } from "@angular/router";

@Component({
    selector: "app-competition-card",
    templateUrl: "./competition-card.template.html",
    styleUrls: ["./competition-card.style.scss"]
})
export class CompetitionCardComponent implements OnInit {
    @Input()
    public competition: Competition;

    @Output()
    public info = new EventEmitter();

    loading$ = this.store$.pipe(select(getCompetitionsAdminLoading));

    public result: boolean;


    constructor(private store$: Store<State>, private router: Router) { }

    public ngOnInit() {
        this.result = false;
    }
}
