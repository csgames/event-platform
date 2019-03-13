import { Component, forwardRef, OnInit, Input, } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
    selector: "app-custom-text-box",
    templateUrl: "./custom-text-box.template.html",
    styleUrls: ["./custom-text-box.style.scss"],
    providers: [
        { 
          provide: NG_VALUE_ACCESSOR,
          useExisting: forwardRef(() => CustomTextBoxComponent),
          multi: true
        }
      ]
})
export class CustomTextBoxComponent implements OnInit, ControlValueAccessor {
    @Input()
    public label: string;

    @Input()
    public placeholder: string;

    @Input()
    public contentText: any;

    @Input()
    public formType: string;

    @Input()
    public textareaRows?: number;

    public formTypesArray: string[];
    
    public languages: string[];

    public languageValue: string;

    public currentTextValue: string;

    constructor() { }

    private propagate: (text: any) => void;

    registerOnChange(fn: (trackFormDto: any) => void): void {
        this.propagate = fn;
    }

    registerOnTouched(fn: any): void {
        // NO-OP
    }

    writeValue(text: any): void {
        if (text) {
            this.contentText = text;
            this.currentTextValue = this.contentText[this.languageValue.toLowerCase()];
        }
    }

    public ngOnInit() {
        this.languages = ["EN", "FR"];
        this.languageValue = "EN";
        this.formTypesArray = ["textbox", "textarea", "rich"];
        if (this.contentText) {
            this.currentTextValue = this.contentText[this.languageValue.toLowerCase()];
        }
        if (!this.textareaRows) {
            this.textareaRows = 10;
        }
        if (!this.contentText) {
            this.contentText = {"en": "", "fr": ""};
            this.currentTextValue = this.contentText[this.languageValue.toLowerCase()];
        }
    }

    public onContentTextChange() {
        this.contentText[this.languageValue.toLowerCase()] = this.currentTextValue;
        this.propagate(this.contentText);
    }

    public onLanguageChange() {
        this.currentTextValue = this.contentText[this.languageValue.toLowerCase()];
    }
}
