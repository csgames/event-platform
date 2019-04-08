import { Component, forwardRef, OnInit, OnDestroy, Input, Inject } from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroup } from "@angular/forms";
import { AddSponsorFormDto } from "./dto/add-sponsor.dto";
import { Subscription } from "rxjs";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { ADD_SPONSOR_FORM_GENERATOR } from "../../sponsor-edit/sponsor-edit.constants";

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
    @Input()
    tier: string;

    public formGroup: FormGroup;
    private propagate: (dto: AddSponsorFormDto) => void;
    private valueChangesSub$: Subscription;
    
    constructor(@Inject(ADD_SPONSOR_FORM_GENERATOR) private formGenerator: FormGenerator<AddSponsorFormDto>) {}

    public ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangesSub$ = this.formGroup.valueChanges.subscribe((value: AddSponsorFormDto) => {
            this.propagate(value);
        })
    }

    public ngOnDestroy() {
        this.valueChangesSub$.unsubscribe();
    }

    public writeValue(obj: AddSponsorFormDto): void {
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
