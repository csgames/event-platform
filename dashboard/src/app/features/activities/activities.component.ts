import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State, getLoading, getSuccess, getActivities, getActivitiesError } from "./store/activities.reducer";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";
import { ActivityFormDto } from "./components/activity-form/dto/activity-form.dto";
import { ActivityFormComponent } from "./components/activity-form/activity-form.component";
import { AddActivity, EditActivity } from "./store/activities.actions";
import { LoadActivities } from "./store/activities.actions";
import { Activity } from "src/app/api/models/activity";

@Component({
    selector: "app-activities",
    templateUrl: "activities.template.html",
    styleUrls: ["activities.style.scss"]
})
export class ActivitiesComponent implements OnInit {
    @ViewChild(ActivityFormComponent)
    private form: ActivityFormComponent;

    loading$ = this.store$.pipe(select(getLoading));
    success$ = this.store$.pipe(select(getSuccess));
    activities$ = this.store$.pipe(select(getActivities));
    error$ = this.store$.pipe(select(getActivitiesError));
    
    public showCreateActivityCard = false;
    public dto = new ActivityFormDto();

    constructor(private store$: Store<State>,
                private toastr: ToastrService) { }

    public ngOnInit() {
        this.success$.subscribe((success) => {
            if (success) {
                this.toastr.success("Sucess");
            }
        });
        this.store$.dispatch(new LoadActivities());
    }

    public clickAddActivity() {
        this.showCreateActivityCard = true;
    }

    public onCancelActivity() {
        this.dto = new ActivityFormDto();
        this.showCreateActivityCard = false;
    }

    public onAdd() {
        if (!this.form.validate()) {
            return;
        }
        this.store$.dispatch(new AddActivity(this.dto));
        this.onCancelActivity();
    }

    public onEdit(activity: Activity) {
        this.store$.dispatch(new EditActivity(activity));
    }
}
