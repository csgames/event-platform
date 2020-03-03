import { Component, ElementRef, EventEmitter, forwardRef, Inject, Input, OnDestroy, OnInit, Output, ViewChild } from "@angular/core";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR, FormControl } from "@angular/forms";
import { Attendee } from "../../api/models/attendee";
import { ATTENDEE_FORM_GENERATOR } from "./attendee-form.constants";
import { FormGenerator } from "../../form-generator/form-generator";
import { Subscription } from "rxjs";
import { Event } from "../../api/models/event";

@Component({
    selector: "app-attendee-form",
    templateUrl: "./attendee-form.template.html",
    styleUrls: ["./attendee-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AttendeeFormComponent),
            multi: true
        }
    ]
})
export class AttendeeFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input()
    public event: Event;

    @ViewChild("downloadButton", { static: true })
    public downloadButton: ElementRef;

    @Output()
    public downloadCv = new EventEmitter();

    public gender = ["male", "female", "other", "no_answer"];
    public tshirtSize = ["small", "medium", "large", "x-large", "2x-large"];
    public attendee: Attendee;
    public formGroup: FormGroup;

    public get hasDietaryRestrictions() {
        return this.formGroup.controls.hasDietaryRestrictions.value;
    }

    public get CVControl(): FormControl {
        return this.formGroup.get("cv") as FormControl;
    }

    private propagate: (obj: Attendee) => void;
    private valueChangesSub$: Subscription;

    constructor(@Inject(ATTENDEE_FORM_GENERATOR) private formGenerator: FormGenerator<Attendee>) {
    }

    public ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangesSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    public ngOnDestroy() {
        this.valueChangesSub$.unsubscribe();
    }

    public writeValue(obj: Attendee): void {
        if (obj) {
            this.attendee = obj;
            this.formGenerator.patchValues(obj);
        }
    }

    public registerOnChange(fn: (obj: Attendee) => void) {
        this.propagate = fn;
    }

    public registerOnTouched(fn: any) {
    }

    public validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }

        this.formGenerator.markAsDirty();
        return false;
    }
}
