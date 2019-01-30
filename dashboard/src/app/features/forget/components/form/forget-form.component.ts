import { Component, forwardRef, OnInit, Inject } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup } from "@angular/forms";
import { FORGET_FORM_GENERATOR } from "../../forget.constants";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { ForgetFormDto } from "../dto/forget-form-dto";

@Component({
    selector: 'app-forget-form',
    templateUrl: 'forget-form.template.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ForgetFormComponent),
            multi: true
        }
    ]
})
export class ForgetFormComponent implements OnInit, ControlValueAccessor {
    public formGroup: FormGroup;
    
    constructor(@Inject(FORGET_FORM_GENERATOR) private formGenerator: FormGenerator<ForgetFormDto>) { }

    private propagate: (dto: ForgetFormDto) => void;

    ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.formGroup.valueChanges.subscribe(dto => {
            this.propagate(dto);
        });
    }

    registerOnChange(fn: (dto: ForgetFormDto) => void): void {
        this.propagate = fn;
    }

    registerOnTouched(fn: any) { }

    writeValue(dto: ForgetFormDto): void {
        if (dto) {
            this.formGroup.patchValue(dto);
        }
    }

    public validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }

        this.formGenerator.markAsDirty();
        return false;
    }
}