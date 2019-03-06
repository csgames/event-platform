import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State, getLoading, getSuccess } from "./store/activities-reducer";
import { ToastrService } from "ngx-toastr";
import { Subscription } from "rxjs";

@Component({
    selector: "app-activities",
    templateUrl: "activities.template.html",
    styleUrls: ["activities.style.scss"]
})
export class ActivitiesComponent implements OnInit, OnDestroy {
    loading$ = this.store$.pipe(select(getLoading));
    success$ = this.store$.pipe(select(getSuccess));
    
    private successSub$: Subscription;

    constructor(private store$: Store<State>,
                private toastr: ToastrService) { }

    public ngOnInit() {
        this.success$.subscribe((success) => {
            if (success) {
                this.toastr.success("Sucess");
            }
        });
    }

    public ngOnDestroy() {
        this.successSub$.unsubscribe();
    }
}