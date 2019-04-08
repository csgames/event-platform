import { Component, forwardRef, Inject, OnInit, OnDestroy } from "@angular/core";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { SECTION_FORM_GENERATOR } from "./section-form.constants";
import { SectionFormDto } from "./dto/section-form.dto";
import { Subscription } from "rxjs";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { EventGuideTypes } from "src/app/api/models/guide";
import { GuideUtils } from "src/app/utils/guide.utils";

@Component({
    selector: "app-section-form",
    templateUrl: "section-form.template.html",
    styleUrls: ["./section-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SectionFormComponent),
            multi: true
        }
    ]
})

export class SectionFormComponent implements OnInit, ControlValueAccessor, OnDestroy {

    public types = Object.values(EventGuideTypes);

    public formGroup: FormGroup;

    constructor(@Inject(SECTION_FORM_GENERATOR) private formGenerator: FormGenerator<SectionFormDto>) { }

    private valueChangeSub$: Subscription;

    private propagate: (sectionFormDto: SectionFormDto) => void;

    ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    ngOnDestroy() {
        this.valueChangeSub$.unsubscribe();
    }

    registerOnChange(fn: (sectionFormDto: SectionFormDto) => void): void {
        this.propagate = fn;
    }

    registerOnTouched(fn: any): void {
        // NO-OP
    }

    writeValue(sectionFormDto: SectionFormDto): void {
        if (sectionFormDto) {
            this.formGenerator.patchValues(sectionFormDto);
        }
    }

    getIcon(type: EventGuideTypes): string {
        return GuideUtils.getGuideTypeIconClass(type);
    }

    validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }
        this.formGenerator.markAsDirty();
        return false;
    }
}
