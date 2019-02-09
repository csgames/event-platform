import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Component({
    selector: "app-admin-team-view",
    templateUrl: "admin-team-view.template.html"
})
export class AdminTeamViewComponent implements OnInit {
    private teamId$: Observable<string>;

    constructor(private activatedRoute: ActivatedRoute) { }

    ngOnInit() {
        this.teamId$ = this.activatedRoute.params.pipe(
            map(p => p["id"])
        );
    }
}
