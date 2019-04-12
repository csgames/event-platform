import { Component, forwardRef, OnInit, Inject } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from "@angular/forms";
import { TransportationSection } from "../../../../../api/models/guide";
import { TranslateService } from "@ngx-translate/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { Subscription } from "rxjs";
import { TRANSPORTATION_FORM_GENERATOR } from "./transportation-form.constants";
import { TransportationFormDto } from "./dto/transportation-form.dto";

@Component({
    selector: "transportation-form",
    templateUrl: "transportation-form.template.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TransportationFormComponent),
            multi: true
        }
    ]
})
export class TransportationFormComponent implements OnInit, ControlValueAccessor {
    public lang: string;
    public section: TransportationSection;
    private propagate: (data: TransportationFormDto) => void;
    public formGroup: FormGroup;
    private valueChangeSub$: Subscription;

    constructor(private translate: TranslateService, 
                @Inject(TRANSPORTATION_FORM_GENERATOR) 
                private formGenerator: FormGenerator<TransportationFormDto>) { }

    public ngOnInit() {
        this.lang = this.translate.getDefaultLang();
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    public writeValue(obj: TransportationSection) {
        if (obj) {
            this.section = obj;
            this.formGenerator.patchValues(this.section);
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
}
