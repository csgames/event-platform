import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Subscription } from "rxjs";
import { Activity } from "src/app/api/models/activity";
import { ActivityFormComponent } from "../activity-form/activity-form.component";
import { getActivities, getActivityEditLoading, getActivityEditSuccess, State } from "./store/edit-activity.reducer";
import { ActivityFormDto } from "../activity-form/dto/activity-form.dto";
import { ResetStore, LoadActivities, SaveActivityEdit } from "./store/edit-activity.actions";

export interface EditActivityModal {
    activity: Activity;
}

@Component({
    selector: "app-edit-activity",
    templateUrl: "edit-activity.template.html"
})
export class EditActivityComponent extends SimpleModalComponent<EditActivityModal, boolean> implements OnInit, OnDestroy {
    @ViewChild(ActivityFormComponent)
    private form: ActivityFormComponent;

    activities$ = this.store$.pipe(select(getActivities));
    loading$ = this.store$.pipe(select(getActivityEditLoading));
    success$ = this.store$.pipe(select(getActivityEditSuccess));

    public activity: Activity;
    public dto = new ActivityFormDto();
    private successSub$: Subscription;

    constructor(private store$: Store<State>) {
        super();
    }

    public ngOnInit() {
        this.store$.dispatch(new ResetStore());
        this.store$.dispatch(new LoadActivities());
        this.dto = {
            ... this.activity,
            beginTime: new Date(this.activity.beginDate),
            endTime: new Date(this.activity.endDate),
            beginDate: new Date(this.activity.beginDate),
            endDate: new Date(this.activity.endDate)
        };
        this.successSub$ = this.success$.subscribe(success => {
            if (success) {
                this.result = true;
                this.close();
            }
        });
    }

    public ngOnDestroy() {
        this.successSub$.unsubscribe();
        super.ngOnDestroy();
    }

    public onClose() {
        this.result = false;
        this.close();
    }

    public clickSave() {
        if (this.form.validate()) {
            this.store$.dispatch(new SaveActivityEdit({
                id: this.activity._id,
                dto: this.dto
            }));
        }
    }
}
