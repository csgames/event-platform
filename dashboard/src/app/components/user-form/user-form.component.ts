import { Component, forwardRef, Inject, OnDestroy, OnInit } from "@angular/core";
import { UserFormDto } from "./dto/user-form.dto";
import { FormGenerator } from "../../form-generator/form-generator";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { USER_FORM_GENERATOR } from "./user-form.constants";
import { Subscription } from "rxjs";

@Component({
    selector: "app-user-form",
    templateUrl: "user-form.template.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => UserFormComponent),
            multi: true
        }
    ]
})
export class UserFormComponent implements OnInit, OnDestroy, ControlValueAccessor {

    public formGroup: FormGroup;

    constructor(@Inject(USER_FORM_GENERATOR) private formGenerator: FormGenerator<UserFormDto>) { }

    private valueChangeSub$: Subscription;

    private propagate: (createAttendee: UserFormDto) => void;

    ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    ngOnDestroy() {
        this.valueChangeSub$.unsubscribe();
    }

    registerOnChange(fn: (createAttendee: UserFormDto) => void): void {
        this.propagate = fn;
    }

    registerOnTouched(fn: any): void {
        // NO-OP
    }

    writeValue(createAttendeeFormDto: UserFormDto): void {
        console.log(createAttendeeFormDto);
        if (createAttendeeFormDto) {
            this.formGenerator.patchValues(createAttendeeFormDto);
        }
    }

    validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }
        this.formGenerator.markAsDirty();
        return false;
    }
}
