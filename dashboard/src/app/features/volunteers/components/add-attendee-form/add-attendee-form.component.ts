import { Component, forwardRef, Inject, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FormGenerator } from "../../../../form-generator/form-generator";
import { PasswordUtils } from "../../../../utils/password.utils";
import { ADD_ATTENDEE_FORM_GENERATOR } from "../../volunteers.constants";
import { AddAttendeeFormDto } from "./dto/add-attendee-form.dto";
import { Subscription } from "rxjs";

@Component({
    selector: "app-add-attendee-form",
    templateUrl: "./add-attendee-form.template.html",
    styleUrls: ["./add-attendee-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AddAttendeeFormComponent),
            multi: true
        }
    ]
})
export class AddAttendeeFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
    public formGroup: FormGroup;
    public viewPassword = false;

    private propagate: (obj: AddAttendeeFormDto) => void;
    private valueChangesSub$: Subscription;

    public get invalidEmail(): boolean {
        return this.formGroup.controls.email.invalid && this.formGroup.controls.email.dirty;
    }

    constructor(@Inject(ADD_ATTENDEE_FORM_GENERATOR) private formGenerator: FormGenerator<AddAttendeeFormDto>) {
    }

    public ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangesSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    public ngOnDestroy() {
        this.valueChangesSub$.unsubscribe();
    }

    public writeValue(obj: AddAttendeeFormDto): void {
        if (obj) {
            this.formGenerator.patchValues(obj);
        }
    }

    public registerOnChange(fn: (obj: AddAttendeeFormDto) => void) {
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
        if (this.formGroup.valid) {
            return true;
        }

        this.formGenerator.markAsDirty();
        return false;
    }
}
