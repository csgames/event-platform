import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CompetitionFormDto } from "./dto/competition-form.dto";
import { COMPETITION_FORM_GENERATOR } from "./competition-form.constants";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { Activity } from "../../../../../api/models/activity";
import { PasswordUtils } from "../../../../../utils/password.utils";
import { Attendee } from "../../../../../api/models/attendee";
import { Subscription } from "rxjs";

@Component({
    selector: "app-competition-form",
    templateUrl: "competition-form.template.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CompetitionFormComponent),
            multi: true
        }
    ]
})
export class CompetitionFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input()
    public activities: Activity[];
    @Input()
    public directors: Attendee[];

    public formGroup: FormGroup;
    public viewPassword = false;
    private valueChangeSub$: Subscription;
    private propagate: (value: CompetitionFormDto) => void;

    constructor(@Inject(COMPETITION_FORM_GENERATOR) private formGenerator: FormGenerator<CompetitionFormDto>) {
    }

    public ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(value => {
            this.propagate(value);
        });
    }

    public ngOnDestroy() {
        this.valueChangeSub$.unsubscribe();
    }

    public writeValue(obj: CompetitionFormDto) {
        if (obj) {
            this.formGenerator.patchValues(obj);
        }
    }

    public registerOnChange(fn: (value: CompetitionFormDto) => void) {
        this.propagate = fn;
    }

    public registerOnTouched(fn: any) {
    }

    public generatePassword() {
        this.formGroup.controls.password.patchValue(PasswordUtils.generatePassword());
    }

    public toggleViewPassword() {
        this.viewPassword = !this.viewPassword;
    }

    public validate(): boolean {
        if (!this.formGroup.valid) {
            this.formGenerator.markAsDirty();
            return false;
        }

        return true;
    }
}
