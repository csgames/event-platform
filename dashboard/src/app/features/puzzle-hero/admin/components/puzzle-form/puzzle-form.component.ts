import { Component, OnDestroy, OnInit, Inject, forwardRef } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { TranslateService } from "@ngx-translate/core";
import { PuzzleInfo, ValidationTypes, PuzzleTypes } from "src/app/api/models/puzzle-hero";
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
export class PuzzleFormComponent implements OnInit, ControlValueAccessor {
    public model: any;
    public validationTypes: string[];
    public puzzleTypes: string[];
    public formGroup: FormGroup;
    private valueChangeSub$: Subscription;

    constructor(@Inject(PUZZLE_FORM_GENERATOR) private formGenerator: FormGenerator<PuzzleFormDto>) { }

    ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });

        this.validationTypes = [];
        for(let i in ValidationTypes) {
            this.validationTypes.push(ValidationTypes[i]);
        }
        
        this.puzzleTypes = [];
        for(let i in PuzzleTypes) {
            this.puzzleTypes.push(PuzzleTypes[i]);
        }
    }

    private propagate: (puzzleFormDto: PuzzleFormDto) => void;

    ngOnDestroy(): void {
        
        // this.puzzleHeroSuccessSub$.unsubscribe();
    }

    public get lang(): string {
        //return this.translateService.getDefaultLang();
        return null;
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
}
