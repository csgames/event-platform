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
    public showCreate = false;
    public newItem = {
        fr: "",
        en: ""
    };
    public newItemError = false;

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

    public itemChange() {
        this.propagate(this.section);
    }

    public deleteValue(index: number) {
        const lang = Object.keys(this.section);
        for (const l of lang) {
            this.section[l].splice(index, 1);
        }
    }

    public clickAdd() {
        this.newItem = {
            fr: "",
            en: ""
        };
        this.showCreate = true;
        this.newItemError = false;
    }

    public cancel() {
        this.showCreate = false;
        this.newItemError = false;
    }

    public add() {
        if (!this.newItem["fr"].length || !this.newItem["en"].length) {
            this.newItemError = true;
            return;
        }
        this.section["fr"].push(this.newItem["fr"]);
        this.section["en"].push(this.newItem["en"]);
        this.propagate(this.section);
        this.showCreate = false;
    }
}
