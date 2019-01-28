import { Component, OnInit } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Attendee } from "../../api/models/attendee";

@Component({
    selector: "app-attendee-form",
    templateUrl: "./attendee-form.template.html",
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: AttendeeFormComponent,
        multi: true
    }]
})
export class AttendeeFormComponent implements OnInit, ControlValueAccessor {
    public gender = ["male", "female", "other", "no_answer"];
    public tshirtSize = ["small", "medium", "large", "x-large", "2x-large"];
    public attendee: Attendee;

    constructor() {
    }

    public ngOnInit() {
    }

    public writeValue(obj: Attendee): void {
    }

    public registerOnChange(fn: any) {
    }

    public registerOnTouched(fn: any) {
    }
}
