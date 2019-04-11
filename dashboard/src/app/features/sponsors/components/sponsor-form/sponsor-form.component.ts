import { Component, forwardRef, OnInit, OnDestroy, Inject } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { ADD_SPONSOR_FORM_GENERATOR } from "../../sponsor-edit/sponsor-edit.constants";
import { SponsorInfoDto } from "./dto/sponsor-info.dto";

@Component({
    selector: "app-sponsor-form",
    templateUrl: "sponsor-form.template.html",
    styleUrls: ["./sponsor-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SponsorFormComponent),
            multi: true
        }
    ]
})
export class SponsorFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
    public formGroup: FormGroup;
    private propagate: (dto: SponsorInfoDto) => void;
    private valueChangesSub$: Subscription;
    
    constructor(@Inject(ADD_SPONSOR_FORM_GENERATOR) private formGenerator: FormGenerator<SponsorInfoDto>) {}

    public ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangesSub$ = this.formGroup.valueChanges.subscribe((value: SponsorInfoDto) => {
            this.propagate(value);
        });
    }

    public ngOnDestroy() {
        this.valueChangesSub$.unsubscribe();
    }

    public writeValue(obj: SponsorInfoDto): void {
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
