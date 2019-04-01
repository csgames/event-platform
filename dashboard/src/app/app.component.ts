import { registerLocaleData } from "@angular/common";
import localeFr from "@angular/common/locales/fr";
import localeFrCa from "@angular/common/locales/fr-CA";
import { Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { AuthenticationService } from "./providers/authentication.service";
import { LoadEvents } from "./store/app.actions";
import { getCurrentAttendee, State } from "./store/app.reducers";
import { MarkdownService } from "ngx-markdown";

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
                private markdownService: MarkdownService,
                private store$: Store<State>) {
        registerLocaleData(localeFr);
        registerLocaleData(localeFrCa);
        this.translate.setDefaultLang(this.translate.getBrowserLang());

        this.currentAttendeeSub$ = this.currentAttendee$.subscribe(async attendee => {
            const isLoggedIn = await this.authService.isLoggedIn().toPromise();
            if (!attendee && isLoggedIn) {
                this.store$.dispatch(new LoadEvents());
            }
            this.currentAttendeeSub$.unsubscribe();
        });

        this.markdownService.renderer.heading = (text: string, level: number) => {
            return `<h${level}>${text}</h${level}><hr>`;
        };
    }
}
