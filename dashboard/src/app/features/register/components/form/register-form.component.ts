import { Component, forwardRef, Inject, OnInit } from "@angular/core";
import { CreateAttendeeFormDto } from "../../dto/create-attendee-form-dto";
import { REGISTER_FORM_GENERATOR } from "../../register.contants";
import { FormGenerator } from "../../../../form-generator/form-generator";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "app-register-form",
    templateUrl: "register-form.template.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RegisterFormComponent),
            multi: true
        }
    ]
})
export class RegisterFormComponent implements OnInit, ControlValueAccessor {

    public formGroup: FormGroup;

    constructor(@Inject(REGISTER_FORM_GENERATOR) private formGenerator: FormGenerator<CreateAttendeeFormDto>) { }

    private propagate: (createAttendee: CreateAttendeeFormDto) => void;

    ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.formGroup.valueChanges.subscribe(createAttendeeFormDto => {
            this.propagate(createAttendeeFormDto);
        });
    }

    registerOnChange(fn: (createAttendee: CreateAttendeeFormDto) => void): void {
        this.propagate = fn;
    }

    registerOnTouched(fn: any): void {
        // NO-OP
    }

    writeValue(createAttendeeFormDto: CreateAttendeeFormDto): void {
        if (createAttendeeFormDto) {
            this.formGroup.patchValue(createAttendeeFormDto);
        }
    }
}
