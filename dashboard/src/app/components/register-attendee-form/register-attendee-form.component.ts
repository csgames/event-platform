import { Component, forwardRef, Inject, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { RegisterAttendeeFormDto } from "./dto/register-attendee-form.dto";
import { Subscription } from "rxjs";
import { FormGenerator } from "../../form-generator/form-generator";
import { PasswordUtils } from "../../utils/password.utils";
import { REGISTER_ATTENDEE_FORM_GENERATOR } from "./register-attendee-form.constant";

@Component({
    selector: "app-register-attendee-form",
    templateUrl: "./register-attendee-form.template.html",
    styleUrls: ["./register-attendee-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RegisterAttendeeFormComponent),
            multi: true
        }
    ]
})
export class RegisterAttendeeFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
    public formGroup: FormGroup;
    public viewPassword = false;

    private propagate: (obj: RegisterAttendeeFormDto) => void;
    private valueChangesSub$: Subscription;

    constructor(@Inject(REGISTER_ATTENDEE_FORM_GENERATOR) private formGenerator: FormGenerator<RegisterAttendeeFormDto>) {
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

    public writeValue(obj: RegisterAttendeeFormDto): void {
        if (obj) {
            this.formGenerator.patchValues(obj);
        }
    }

    public registerOnChange(fn: (obj: RegisterAttendeeFormDto) => void) {
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
