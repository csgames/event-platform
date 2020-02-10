import { Component, OnDestroy, OnInit } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getCurrentEvent, State } from "../../../store/app.reducers";
import { SetNavigation } from "../../../store/app.actions";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: "app-events-settings",
    templateUrl: "event-settings.template.html"
})
export class EventSettingsComponent implements OnInit, OnDestroy {
    currentEvent$ = this.store$.pipe(select(getCurrentEvent));

    type = "general";

    constructor(private store$: Store<State>, private route: ActivatedRoute, private router: Router) {
    }

    ngOnInit(): void {
        this.store$.dispatch(new SetNavigation("event-settings"));
        this.route.params.subscribe(param => {
            this.type = param["type"] || "general";

            if (this.type === "template") {
                this.router.navigate([], {
                    queryParams: {
                        type: "attendee"
                    }
                });
            }
        });
    }

    ngOnDestroy(): void {
        this.store$.dispatch(new SetNavigation("event"));
    }
}
