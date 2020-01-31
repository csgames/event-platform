import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getCurrentEvent, State } from "../../../store/app.reducers";
import { SetNavigation } from "../../../store/app.actions";
import { ActivatedRoute } from "@angular/router";
import { EventFormComponent } from "../../../components/event-form/event-form.component";
import { EditEvent } from "./store/event-settings.actions";
import { EventFormDto } from "../../../components/event-form/dto/event-form.dto";

@Component({
    selector: "app-events-settings",
    templateUrl: "event-settings.template.html"
})
export class EventSettingsComponent implements OnInit, OnDestroy {
    currentEvent$ = this.store$.pipe(select(getCurrentEvent));

    type = "general";

    constructor(private store$: Store<State>, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        this.store$.dispatch(new SetNavigation("event-settings"));
        this.route.params.subscribe(param => {
            this.type = param["type"] || "general";
        });
    }

    ngOnDestroy(): void {
        this.store$.dispatch(new SetNavigation("event"));
    }

    editEvent(dto: EventFormDto) {
        this.store$.dispatch(new EditEvent(dto));
    }
}
