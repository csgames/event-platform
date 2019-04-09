import { Component, forwardRef, OnInit, Inject } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from "@angular/forms";
import { HotelSection } from "../../../../../api/models/guide";
import { TranslateService } from "@ngx-translate/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { Subscription } from "rxjs";
import { HOTEL_FORM_GENERATOR } from "./hotel-form.constants";
import { HotelFormDto } from "./dto/hotel-form.dto";

@Component({
    selector: "hotel-form",
    templateUrl: "hotel-form.template.html",
    styleUrls: ["hotel-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HotelFormComponent),
            multi: true
        }
    ]
})
export class HotelFormComponent implements OnInit, ControlValueAccessor {
    public lang: string;
    public section: HotelSection;
    private propagate: (data: HotelFormDto) => void;
    public formGroup: FormGroup;
    private valueChangeSub$: Subscription;

    constructor(private translate: TranslateService, @Inject(HOTEL_FORM_GENERATOR) private formGenerator: FormGenerator<HotelFormDto>) {
    }

    public ngOnInit() {
        this.lang = this.translate.getDefaultLang();
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    public writeValue(hotelFormDto: HotelFormDto) {
        if (hotelFormDto) {
            this.formGenerator.patchValues(hotelFormDto);
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
