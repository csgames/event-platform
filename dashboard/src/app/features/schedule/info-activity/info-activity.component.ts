import { Component, OnDestroy, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Activity } from "src/app/api/models/activity";
import { TranslateService } from "@ngx-translate/core";
import { select, Store } from "@ngrx/store";
import { getLoading, getSubscribed, State } from "./store/info-activity.reducer";
import { CheckIfSubscribedToActivity, ResetStore, SubscribeToActivity } from "./store/info-activity.actions";
import { getScheduleLoading } from "../store/schedule.reducer";

export interface InfoActivityModal {
    activity: Activity;
    time: string;
}

@Component({
    selector: "app-info-activity-modal",
    templateUrl: "info-activity.template.html",
    styleUrls: ["info-activity.style.scss"]
})
export class InfoActivityComponent extends SimpleModalComponent<InfoActivityModal, void> implements InfoActivityModal, OnInit, OnDestroy {
    public activity: Activity;
    public time: string;
    public MAX_CHAR_DESCRIPTION = 1000;

    loading$ = this.store$.pipe(select(getLoading));
    subscribed$ = this.store$.pipe(select(getSubscribed));

    constructor(private translateService: TranslateService,
                private store$: Store<State>) {
        super();
    }

    public ngOnInit() {
        this.store$.dispatch(new CheckIfSubscribedToActivity(this.activity._id));
    }

    public subscribe() {
        this.store$.dispatch(new SubscribeToActivity(this.activity._id));
    }

    public onClose() {
        this.close();
        setTimeout(() => this.store$.dispatch(new ResetStore()), 1000);
    }

    public get lang(): string {
        return this.translateService.getDefaultLang();
    }

    public get modalClass(): string {
        if (this.activity.details[this.lang].length > this.MAX_CHAR_DESCRIPTION) {
            return "modal-lg";
        }
        return "modal-md";
    }
}
