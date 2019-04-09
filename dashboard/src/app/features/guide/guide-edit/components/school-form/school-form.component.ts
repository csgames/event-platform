import { Component, forwardRef, OnInit, Inject } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from "@angular/forms";
import { SchoolSection } from "../../../../../api/models/guide";
import { TranslateService } from "@ngx-translate/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { Subscription } from "rxjs";
import { SCHOOL_FORM_GENERATOR } from "./school-form.constants";
import { SchoolFormDto } from "./dto/school-form.dto";

@Component({
    selector: "school-form",
    templateUrl: "school-form.template.html",
    styleUrls: ["school-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SchoolFormComponent),
            multi: true
        }
    ]
})
export class SchoolFormComponent implements OnInit, ControlValueAccessor {
    public lang: string;
    public section: SchoolSection;
    private propagate: (data: SchoolFormDto) => void;
    public formGroup: FormGroup;
    private valueChangeSub$: Subscription;

    constructor(private translate: TranslateService, @Inject(SCHOOL_FORM_GENERATOR) private formGenerator: FormGenerator<SchoolFormDto>) {
    }

    public ngOnInit() {
        this.lang = this.translate.getDefaultLang();
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    public writeValue(schoolFormDto: SchoolFormDto) {
        if (schoolFormDto) {
            this.formGenerator.patchValues(schoolFormDto);
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
