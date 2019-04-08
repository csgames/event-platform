import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ActivityFormDto } from "./dto/activity-form.dto";
import { ACTIVITY_FORM_GENERATOR } from "./activity-form.constants";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { Subscription } from "rxjs";
import { ActivityTypes, Activity } from "src/app/api/models/activity";
import { ActivityUtils } from "src/app/utils/activity.utils";

@Component({
    selector: "app-activity-form",
    templateUrl: "activity-form.template.html",
    styleUrls: ["activity-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ActivityFormComponent),
            multi: true
        }
    ]
})
export class ActivityFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input()
    public activity: Activity;

    public formGroup: FormGroup;
    public activityTypes: string[];

    private valueChangeSub$: Subscription;
    private propagate: (value: ActivityFormDto) => void;

    constructor(@Inject(ACTIVITY_FORM_GENERATOR) private formGenerator: FormGenerator<ActivityFormDto>) {
    }

    public ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(value => {
            this.propagate(value);
        });
        this.activityTypes = [];
        for (const i of Object.keys(ActivityTypes)) {
            this.activityTypes.push(ActivityTypes[i]);
        }
    }

    public ngOnDestroy() {
        this.valueChangeSub$.unsubscribe();
    }

    public writeValue(obj: ActivityFormDto) {
        if (obj) {
            this.formGenerator.patchValues(obj);
        }
    }

    public registerOnChange(fn: (value: ActivityFormDto) => void) {
        this.propagate = fn;
    }

    public registerOnTouched(fn: any) {
    }

    public validate(): boolean {
        if (!this.formGroup.valid) {
            this.formGenerator.markAsDirty();
            return false;
        }

        return true;
    }

    getActivityTypeIcon(type: ActivityTypes): string {
        return ActivityUtils.getActivityTypeIconClass(type);
    }
}
