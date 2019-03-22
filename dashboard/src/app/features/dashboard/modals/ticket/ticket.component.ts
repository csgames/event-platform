import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { SimpleModalComponent } from "ngx-simple-modal";
import * as QRCode from "qrcode";
import { Subscription } from "rxjs";
import { getCurrentAttendee, State } from "../../../../store/app.reducers";

@Component({
    selector: "app-ticket-modal",
    templateUrl: "ticket.template.html",
    styleUrls: ["ticket.style.scss"]
})
export class TicketComponent extends SimpleModalComponent<void, void> implements OnInit, OnDestroy {
    @ViewChild("ticket")
    public canvas: ElementRef;
    public currentAttendee$ = this.store$.pipe(select(getCurrentAttendee));
    private currentAttendeeSub$: Subscription;

    constructor(private store$: Store<State>) {
        super();
    }

    public async ngOnInit() {
        this.currentAttendeeSub$ = this.currentAttendee$.subscribe(async attendee => {
            await QRCode.toCanvas(this.canvas.nativeElement, attendee.email);
        });
    }

    public ngOnDestroy() {
        this.currentAttendeeSub$.unsubscribe();
        super.ngOnDestroy();
    }

    public clickCancel() {
        this.close();
    }
}
