import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import {
    getCreateEventModalError,
    getCreateEventModalLoading,
    getCreateEventModalSuccess,
    State
} from "./store/create-event-modal.reducer";
import { select, Store } from "@ngrx/store";
import { EventFormComponent } from "../../components/event-form/event-form.component";
import { EventFormDto } from "../../components/event-form/dto/event-form.dto";
import { CreateEvent, ResetState } from "./store/create-event-modal.actions";
import { Subscription } from "rxjs";

@Component({
    selector: "app-create-event-modal",
    templateUrl: "create-event-modal.template.html",
    styleUrls: ["./create-event-modal.style.scss"]
})
export class CreateEventModalComponent extends SimpleModalComponent<void, void> implements OnInit, OnDestroy {
    @ViewChild(EventFormComponent, { static: true })
    public eventFormComponent: EventFormComponent;

    public eventFormDto: EventFormDto = new EventFormDto();

    loading$ = this.store$.pipe(select(getCreateEventModalLoading));
    error$ = this.store$.pipe(select(getCreateEventModalError));
    success$ = this.store$.pipe(select(getCreateEventModalSuccess));

    private successSubscription$: Subscription;

    constructor(private store$: Store<State>) {
        super();
    }

    ngOnInit() {
        this.store$.dispatch(new ResetState());
        this.successSubscription$ = this.success$.subscribe((success) => {
            if (success) {
                this.close();
            }
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.successSubscription$.unsubscribe();
    }

    createEvent() {
        if (this.eventFormComponent.validate()) {
            this.store$.dispatch(new CreateEvent(this.eventFormDto));
        }
    }
}
