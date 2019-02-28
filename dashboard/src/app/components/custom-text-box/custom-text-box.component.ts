import { Component, ElementRef, EventEmitter, forwardRef, Inject, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Attendee } from "../../api/models/attendee";
import { FormGenerator } from "../../form-generator/form-generator";
import { Subscription } from "rxjs";

@Component({
    selector: "app-custom-text-box",
    templateUrl: "./custom-text-box.template.html",
    styleUrls: ["./custom-text-box.style.scss"],
    providers: [ ]
})
export class CustomTextBoxComponent implements OnInit, OnDestroy, ControlValueAccessor {
    private propagate: (obj: Attendee) => void;
    private valueChangesSub$: Subscription;

    constructor() {
    }

    public ngOnInit() {
    }

    public ngOnDestroy() {
        this.valueChangesSub$.unsubscribe();
    }

    public writeValue(obj: Attendee): void {
        // if (obj) {
        //     this.attendee = obj;
        //     this.formGenerator.patchValues(obj);
        // }
    }

    public registerOnChange(fn: (obj: Attendee) => void) {
        this.propagate = fn;
    }

    public registerOnTouched(fn: any) {
    }
}
