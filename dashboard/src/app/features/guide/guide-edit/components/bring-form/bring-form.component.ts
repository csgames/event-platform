import { Component, forwardRef, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { BringSection } from "../../../../../api/models/guide";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "bring-form",
    templateUrl: "bring-form.template.html",
    styleUrls: ["bring-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => BringFormComponent),
            multi: true
        }
    ]
})
export class BringFormComponent implements OnInit, ControlValueAccessor {
    public lang: string;
    public languages = ["fr", "en"];
    public section: BringSection;
    private propagate: (data: BringSection) => void;

    constructor(private translate: TranslateService) {
    }

    public ngOnInit() {
        this.lang = this.translate.getDefaultLang();
    }

    public writeValue(obj: BringSection) {
        if (obj) {
            this.section = obj;
        }
    }

    public registerOnChange(fn: any): void {
        this.propagate = fn;
    }

    public registerOnTouched(fn: any): void {
    }
}
