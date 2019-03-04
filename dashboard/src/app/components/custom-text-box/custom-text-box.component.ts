import { Component, ElementRef, EventEmitter, forwardRef, Inject, OnDestroy, OnInit, Output, ViewChild, Input, AfterViewInit } from "@angular/core";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Attendee } from "../../api/models/attendee";
import { FormGenerator } from "../../form-generator/form-generator";
import { Subscription } from "rxjs";
import { NgSelectComponent } from "@ng-select/ng-select";

@Component({
    selector: "app-custom-text-box",
    templateUrl: "./custom-text-box.template.html",
    styleUrls: ["./custom-text-box.style.scss"]
})
export class CustomTextBoxComponent implements OnInit {
    private propagate: (obj: Attendee) => void;
    private valueChangesSub$: Subscription;
    
    @Input()
    public label: string;

    @Input()
    public placeholder: string;

    @Input()
    public contentText: any;

    @Output() 
    public contentTextChange: EventEmitter<any>;

    @Input()
    public formType: string;

    @Input()
    public textareaRows?: number;

    public formTypesArray: string[];
    
    public languages: string[];

    public languageValue: string;

    public currentTextValue: string;

    constructor() {
        
    }

    public ngOnInit() {
        this.languages = ["EN", "FR"];
        this.languageValue = "EN";
        this.formTypesArray = ["textbox", "textarea", "rich"];
        this.currentTextValue = this.contentText[this.languageValue.toLowerCase()];
        this.contentTextChange = new EventEmitter();
        if(!this.textareaRows) {
            this.textareaRows = 10;
        }
    }

    public onContentTextChange() {
        this.contentText[this.languageValue.toLowerCase()] = this.currentTextValue;
        this.contentTextChange.emit(this.contentText);
    }

    public onLanguageChange() {
        this.currentTextValue = this.contentText[this.languageValue.toLowerCase()];
    }
}
