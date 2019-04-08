import { Component, OnInit, OnDestroy, forwardRef, Inject } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup } from "@angular/forms";
import { SponsorPositionningDto } from "./dto/sponsor-positionning.dto";
import { Subscription } from "rxjs";
import { UPDATE_SPONSOR_POSITIONNING_FORM_GENERATOR } from "./sponsor-positionning-form.constants";
import { FormGenerator } from "src/app/form-generator/form-generator";

@Component({
    selector: "app-sponsor-positionning-form",
    templateUrl: "sponsor-positionning-form.template.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SponsorPositionningFormComponent),
            multi: true
        }
    ]
})
export class SponsorPositionningFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
    public formGroup: FormGroup;
    private propagate: (dto: SponsorPositionningDto) => void;
    private valueChangesSub$: Subscription;
    
    constructor(
        @Inject(UPDATE_SPONSOR_POSITIONNING_FORM_GENERATOR) private formGenerator: FormGenerator<SponsorPositionningDto>
    ) {}

    public ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangesSub$ = this.formGroup.valueChanges.subscribe((value: SponsorPositionningDto) => {
            this.propagate(value);
        });
    }

    public ngOnDestroy() {
        this.valueChangesSub$.unsubscribe();
    }

    public writeValue(obj: SponsorPositionningDto): void {
        if (obj) {
            this.formGenerator.patchValues(obj);
        }
    }

    public registerOnChange(fn: any): void {
        this.propagate = fn;
    }

    public registerOnTouched(fn: any): void {}

    public validate() {
        if (!this.formGroup.valid) {
            this.formGenerator.markAsDirty();
        }

        return this.formGroup.valid;
    }
}
