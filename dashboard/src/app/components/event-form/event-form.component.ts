import { Component, forwardRef, Inject, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { FormGenerator } from "../../form-generator/form-generator";
import { EVENT_FORM_GENERATOR } from "./event-form.constants";
import { EventFormDto } from "./dto/event-form.dto";
import { Subscription } from "rxjs";
import { ThemeService } from "../../providers/theme.service";

@Component({
    selector: "app-event-form",
    templateUrl: "event-form.template.html",
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => EventFormComponent),
            multi: true
        }
    ]
})
export class EventFormComponent implements ControlValueAccessor, OnInit, OnDestroy {

    public formGroup: FormGroup;
    private propagate: (obj: EventFormDto) => void;

    private valueChangesSub$: Subscription;

    constructor(@Inject(EVENT_FORM_GENERATOR) private formGenerator: FormGenerator<EventFormDto>,
                private themeService: ThemeService) { }

    ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangesSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    ngOnDestroy(): void {
        this.valueChangesSub$.unsubscribe();
        this.themeService.resetPrimaryColor();
    }

    registerOnChange(fn: (obj: EventFormDto) => void): void {
        this.propagate = fn;
    }

    registerOnTouched(fn: any): void {
        // NO-OP
    }

    writeValue(obj: EventFormDto): void {
        if (obj) {
            this.formGenerator.patchValues(obj);
        }
    }

    public validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }

        this.formGenerator.markAsDirty();
        return false;
    }

    public get primaryColor(): string {
        if (!this.formGroup || !this.formGroup.controls["primaryColor"]) { return; }
        return this.formGroup.controls["primaryColor"].value;
    }

    public set primaryColor(color: string) {
        if (!this.formGroup || !this.formGroup.controls["primaryColor"]) { return; }
        this.themeService.setTemporaryPrimaryColor(color);
        this.formGroup.controls["primaryColor"].setValue(color);
    }
}
