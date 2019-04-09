import { Component, forwardRef, OnInit, Inject } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from "@angular/forms";
import { ParkingSection } from "../../../../../api/models/guide";
import { TranslateService } from "@ngx-translate/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { Subscription } from "rxjs";
import { PARKING_FORM_GENERATOR } from "./parking-form.constants";
import { ParkingFormDto } from "./dto/parking-form.dto";

@Component({
    selector: "parking-form",
    templateUrl: "parking-form.template.html",
    styleUrls: ["parking-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ParkingFormComponent),
            multi: true
        }
    ]
})
export class ParkingFormComponent implements OnInit, ControlValueAccessor {
    public lang: string;
    public section: ParkingSection;
    private propagate: (data: ParkingFormDto) => void;
    public formGroup: FormGroup;
    private valueChangeSub$: Subscription;

    constructor(private translate: TranslateService, @Inject(PARKING_FORM_GENERATOR) private formGenerator: FormGenerator<ParkingFormDto>) {
    }

    public ngOnInit() {
        this.lang = this.translate.getDefaultLang();
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    public writeValue(parkingFormDto: ParkingFormDto) {
        if (parkingFormDto) {
            this.formGenerator.patchValues(parkingFormDto);
        }
    }

    public registerOnChange(fn: any): void {
        this.propagate = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }
        this.formGenerator.markAsDirty();
        return false;
    }

    public clickSave() {
        if (this.validate()) { }
    }
}
