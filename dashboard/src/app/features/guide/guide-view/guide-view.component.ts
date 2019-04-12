import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { filter } from "rxjs/operators";
import * as fromApp from "../../../store/app.reducers";
import { State } from "../../../store/app.reducers";
import { TranslateService } from "@ngx-translate/core";
import { Subscription } from "rxjs";
import { getGuideLoading, getGuide } from "./store/guide.reducer";
import { EventGuide } from "src/app/api/models/guide";
import { LoadGuide } from "./store/guide.actions";

@Component({
    selector: "app-guide",
    templateUrl: "guide-view.template.html",
    styleUrls: ["guide-view.style.scss"]
})
export class GuideViewComponent implements OnInit, OnDestroy {
    private currentGuide$ = this.store$.pipe(select(getGuide));
    public loading$ = this.store$.pipe(select(getGuideLoading));
    public currentEvent$ = this.store$.pipe(select(fromApp.getCurrentEvent));

    private currentGuideSub$: Subscription;
    private currentEventSub$: Subscription;
    public guide: EventGuide;

    constructor(private store$: Store<State>,
                private translateService: TranslateService) {}

    public ngOnInit() {
        this.currentEventSub$ = this.currentEvent$.pipe(filter((e) => !!e)).subscribe(() => {
            this.store$.dispatch(new LoadGuide());
        });

        this.currentGuideSub$ = this.currentGuide$.subscribe((guide: EventGuide) => {
            this.guide = guide;
        });
    }

    public ngOnDestroy(): void {
        this.currentEventSub$.unsubscribe();
        this.currentGuideSub$.unsubscribe();
    }

    public lang() {
        return this.translateService.defaultLang;
    }
}
