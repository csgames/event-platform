import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SimpleModalService } from "ngx-simple-modal";
import { NotificationsListModalComponent } from "../../../../modals/notifications-list-modal/notifications-list-modal.component";
import { State } from "../../../../store/app.reducers";
import { select, Store } from "@ngrx/store";
import { Logout } from "../../../../store/app.actions";
import * as fromApp from "../../../../store/app.reducers";

@Component({
    selector: "app-top-nav",
    templateUrl: "top-nav.template.html",
    styleUrls: ["./top-nav.style.scss"]
})

export class TopNavComponent implements OnInit {

    @Input()
    public showToggleSideNav = false;

    @Output()
    public toggleSideNav = new EventEmitter<boolean>();
    @Output()
    public editProfile = new EventEmitter();

    private _toggleSideNav = false;

    public currentAttendee$ = this.store$.pipe(select(fromApp.getCurrentAttendee));

    constructor(
        private modalService: SimpleModalService,
        private store$: Store<State>
    ) { }

    ngOnInit() { }

    clickNotificationsButton() {
        this.modalService.addModal(NotificationsListModalComponent);
    }

    clickToggleSideNav() {
        this._toggleSideNav = !this._toggleSideNav;
        this.toggleSideNav.emit(this._toggleSideNav);
    }

    clickLogout() {
        this.store$.dispatch(new Logout());
    }
}
