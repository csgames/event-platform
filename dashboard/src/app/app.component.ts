import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import localeFrCa from "@angular/common/locales/fr-CA";
import { Component } from "@angular/core";
import { AngularFireMessaging } from "@angular/fire/messaging";
import { select, Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { AuthenticationService } from "./providers/authentication.service";
import { LoadEvents, SetupMessagingToken } from "./store/app.actions";
import { getCurrentAttendee, State } from "./store/app.reducers";

@Component({
    selector: "app-root",
    templateUrl: "./app.template.html",
    styleUrls: ["./app.style.scss"]
})
export class AppComponent {
    currentAttendee$ = this.store$.pipe(select(getCurrentAttendee));
    currentAttendeeSub$: Subscription;

    constructor(private translate: TranslateService,
                private authService: AuthenticationService,
                private store$: Store<State>,
                private afMessaging: AngularFireMessaging) {
        registerLocaleData(localeFr);
        registerLocaleData(localeFrCa);
        this.translate.setDefaultLang(this.translate.getBrowserLang());

        this.currentAttendeeSub$ = this.currentAttendee$.subscribe(async attendee => {
            const isLoggedIn = await this.authService.isLoggedIn().toPromise();
            if (!attendee && isLoggedIn) {
                this.store$.dispatch(new LoadEvents());
                const token = await this.afMessaging.getToken.toPromise();
                this.store$.dispatch(new SetupMessagingToken(token));
            }
            this.currentAttendeeSub$.unsubscribe();
        });
    }
}
