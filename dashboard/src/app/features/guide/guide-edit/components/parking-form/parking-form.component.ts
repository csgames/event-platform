import { Component, forwardRef, OnInit, Inject } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from "@angular/forms";
import { ParkingSection, Coordinate } from "../../../../../api/models/guide";
import { TranslateService } from "@ngx-translate/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { Subscription } from "rxjs";
import { PARKING_FORM_GENERATOR } from "./parking-form.constants";
import { ParkingFormDto } from "./dto/parking-form.dto";

@Component({
    selector: "parking-form",
    templateUrl: "parking-form.template.html",
    styleUrls: ["parking-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ParkingFormComponent),
            multi: true
        }
    ]
})
export class ParkingFormComponent implements OnInit, ControlValueAccessor {
    public section: ParkingSection;
    private propagate: (data: ParkingFormDto) => void;
    public formGroup: FormGroup;
    public showCreate = false;
    public newMarker: Coordinate;
    private valueChangeSub$: Subscription;

    constructor(private translate: TranslateService, @Inject(PARKING_FORM_GENERATOR) private formGenerator: FormGenerator<ParkingFormDto>) {
    }

    public ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    public writeValue(obj: ParkingSection) {
        if (obj) {
            this.section = obj;
            this.formGenerator.patchValues(this.section);
        }
    }

    public registerOnChange(fn: (data: ParkingFormDto) => void): void {
        this.propagate = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public itemChange() {
        this.propagate(this.section);
    }

    public clickAdd() {
        this.newMarker = {
            latitude: null,
            longitude: null
        };
        this.showCreate = true;
    }

    public cancel() {
        this.showCreate = false;
    }

    public add() {
        this.section.coordinates.push(this.newMarker);
        this.propagate(this.section);
        this.formGenerator.patchValues(this.section);
        this.showCreate = false;
    }

    validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }
        this.formGenerator.markAsDirty();
        return false;
    }

    public deleteValue(index: number) {
        this.section.coordinates.splice(index, 1);
        this.formGenerator.patchValues(this.section);
    }
}
