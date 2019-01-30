import { Component, EventEmitter, Input, OnInit, Output, OnDestroy } from "@angular/core";
import { SimpleModalService } from "ngx-simple-modal";
import { NotificationsListModalComponent } from "../../../../modals/notifications-list-modal/notifications-list-modal.component";
import { State } from "../../../../store/app.reducers";
import { select, Store } from "@ngrx/store";
import { Logout, ChangeLanguage } from "../../../../store/app.actions";
import * as fromApp from "../../../../store/app.reducers";
import { Subscription } from "rxjs";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-top-nav",
    templateUrl: "top-nav.template.html",
    styleUrls: ["./top-nav.style.scss"]
})

export class TopNavComponent implements OnInit, OnDestroy {

    @Input()
    public showToggleSideNav = false;

    @Output()
    public toggleSideNav = new EventEmitter<boolean>();
    @Output()
    public editProfile = new EventEmitter();

    private _toggleSideNav = false;

    public currentAttendee$ = this.store$.pipe(select(fromApp.getCurrentAttendee));
    public language$ = this.store$.pipe(select(fromApp.getCurrentLanguage));
    private language: string;
    private languageSub$: Subscription;

    constructor(
        private modalService: SimpleModalService,
        private store$: Store<State>,
        private translateService: TranslateService
    ) { }

    ngOnInit() {
        this.languageSub$ = this.language$.subscribe((language) => {
            this.language = language;
        });
    }

    ngOnDestroy() {
        this.languageSub$.unsubscribe();
    }

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

    changeLanguage() {
        if (!this.language) {
            let lang: string = this.translateService.getBrowserLang();
            this.store$.dispatch(new ChangeLanguage(lang === 'en' ? 'fr' : 'en'));
            return;
        } 

        if (this.language === "fr") {
            this.store$.dispatch(new ChangeLanguage("en"));
        } else {
            this.store$.dispatch(new ChangeLanguage("fr"));
        }
    }
}
