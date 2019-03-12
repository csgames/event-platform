import { Component, OnDestroy, OnInit, Inject, forwardRef } from "@angular/core";
import { ValidationTypes, PuzzleTypes } from "src/app/api/models/puzzle-hero";
import { PuzzleFormDto } from "./dto/puzzle-form.dto";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { PUZZLE_FORM_GENERATOR } from "./puzzle-form.constants";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Subscription } from "rxjs";

@Component({
    selector: "app-puzzle-form",
    templateUrl: "puzzle-form.template.html",
    styleUrls: ["puzzle-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => PuzzleFormComponent),
            multi: true
        }
    ]
})
export class PuzzleFormComponent implements OnInit, ControlValueAccessor, OnDestroy {

    constructor(@Inject(PUZZLE_FORM_GENERATOR) private formGenerator: FormGenerator<PuzzleFormDto>) { }

    public model: any;
    public validationTypes: string[];
    public puzzleTypes: string[];
    public formGroup: FormGroup;
    private valueChangeSub$: Subscription;

    private propagate: (puzzleFormDto: PuzzleFormDto) => void;

    ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });

        this.validationTypes = [];
        for (const i of Object.keys(ValidationTypes)) {
            this.validationTypes.push(ValidationTypes[i]);
        }
        
        this.puzzleTypes = [];
        for (const i of Object.keys(PuzzleTypes)) {
            this.puzzleTypes.push(PuzzleTypes[i]);
        }
    }

    ngOnDestroy() {
        this.valueChangeSub$.unsubscribe();
    }

    registerOnChange(fn: (puzzleFormDto: PuzzleFormDto) => void): void {
        this.propagate = fn;
    }

    registerOnTouched(fn: any): void {
        // NO-OP
    }

    writeValue(trackFormDto: PuzzleFormDto): void {
        if (trackFormDto) {
            this.formGenerator.patchValues(trackFormDto);
        }
    }

    validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }
        this.formGenerator.markAsDirty();
        return false;
    }

    getPuzzleTypeIcon(type: string): string {
        switch (type) {
            case PuzzleTypes.Crypto:
                return "fa-key";
            case PuzzleTypes.Gaming:
                return "fa-gamepad";
            case PuzzleTypes.Scavenger:
                return "fa-camera-alt";
        }
        return "";
    }

    getValidationIcon(type: string): string {
        switch (type) {
            case ValidationTypes.String:
                return "fa-align-justify";
            case ValidationTypes.Function:
                return "fa-function";
            case ValidationTypes.Regex:
                return "fa-space-shuttle";
        }
        return "";
    }
}
