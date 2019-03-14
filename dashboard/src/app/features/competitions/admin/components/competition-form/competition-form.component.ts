import { Component, forwardRef, Inject, Input, OnInit } from "@angular/core";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { CompetitionFormDto } from "./dto/competition-form.dto";
import { COMPETITION_FORM_GENERATOR } from "./competition-form.constants";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { Activity } from "../../../../../api/models/activity";
import { PasswordUtils } from "../../../../../utils/password.utils";

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
export class CompetitionFormComponent implements OnInit, ControlValueAccessor {
    @Input()
    public activities: Activity[];

    public formGroup: FormGroup;
    public viewPassword = false;
    private propagate: (value: CompetitionFormDto) => void;

    constructor(@Inject(COMPETITION_FORM_GENERATOR) private formGenerator: FormGenerator<CompetitionFormDto>) {
    }

    public ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
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
}
