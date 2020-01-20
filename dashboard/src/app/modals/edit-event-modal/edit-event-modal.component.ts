import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { EventFormComponent } from "../../components/event-form/event-form.component";
import { EventFormDto } from "../../components/event-form/dto/event-form.dto";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { EditEvent, ResetState } from "./store/edit-event-modal.actions";
import { getEditEventModalError, getEditEventModalLoading, getEditEventModalSuccess, State } from "./store/edit-event-modal.reducer";
import { SimpleModalComponent } from "ngx-simple-modal";
import { getCurrentEvent } from "../../store/app.reducers";
import { EventUtils } from "../../utils/event.utils";

@Component({
    selector: "app-edit-event-modal",
    templateUrl: "edit-event-modal.template.html",
    styleUrls: ["./edit-event-modal.style.scss"]
})
export class EditEventModalComponent extends SimpleModalComponent<void, void> implements OnInit, OnDestroy {
    @ViewChild(EventFormComponent)
    public eventFormComponent: EventFormComponent;

    public eventFormDto: EventFormDto = new EventFormDto();

    loading$ = this.store$.pipe(select(getEditEventModalLoading));
    error$ = this.store$.pipe(select(getEditEventModalError));
    success$ = this.store$.pipe(select(getEditEventModalSuccess));
    event$ = this.store$.pipe(select(getCurrentEvent));

    private successSubscription$: Subscription;
    private eventSubscription$: Subscription;

    constructor(private store$: Store<State>) {
        super();
    }

    ngOnInit() {
        this.store$.dispatch(new ResetState());
        this.eventSubscription$ = this.event$.subscribe((event) => {
            this.eventFormDto = EventUtils.eventToEventFormDto(event);
        });
        this.successSubscription$ = this.success$.subscribe((success) => {
            if (success) {
                this.close();
            }
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.successSubscription$.unsubscribe();
        this.eventSubscription$.unsubscribe();
    }

    createEvent() {
        if (this.eventFormComponent.validate()) {
            this.store$.dispatch(new EditEvent(this.eventFormDto));
        }
    }
}
