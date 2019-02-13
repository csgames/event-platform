import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { getCurrentAttendee, State } from "./store/app.reducers";
import { select, Store } from "@ngrx/store";
import { LoadEvents } from "./store/app.actions";
import { Subscription } from "rxjs";
import { AuthenticationService } from "./providers/authentication.service";

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
                private store$: Store<State>) {
        this.translate.setDefaultLang(this.translate.getBrowserLang());

        this.currentAttendeeSub$ = this.currentAttendee$.subscribe(async attendee => {
            const isLoggedIn = await this.authService.isLoggedIn().toPromise();
            if (!attendee && isLoggedIn) {
                this.store$.dispatch(new LoadEvents());
            }
            this.currentAttendeeSub$.unsubscribe();
        });
    }
}
