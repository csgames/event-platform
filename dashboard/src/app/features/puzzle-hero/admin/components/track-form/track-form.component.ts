import { Component, forwardRef, Inject, OnInit, OnDestroy } from "@angular/core";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { TRACK_FORM_GENERATOR } from "./track-form.constants";
import { TrackFormDto } from "./dto/track-form.dto";
import { Subscription } from "rxjs";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { TrackTypes } from "../../../../../api/models/puzzle-hero";
import { TrackUtils } from "../../../../../utils/track.utils";
import { QuestionTypes } from "../../../../../api/models/question";

@Component({
    selector: "app-track-form",
    templateUrl: "track-form.template.html",
    styleUrls: ["./track-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TrackFormComponent),
            multi: true
        }
    ]
})
export class TrackFormComponent implements OnInit, ControlValueAccessor, OnDestroy {

    public types = Object.values(TrackTypes);

    public formGroup: FormGroup;

    constructor(@Inject(TRACK_FORM_GENERATOR) private formGenerator: FormGenerator<TrackFormDto>) { }

    private valueChangeSub$: Subscription;

    private propagate: (trackFormDto: TrackFormDto) => void;

    ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    ngOnDestroy() {
        this.valueChangeSub$.unsubscribe();
    }

    registerOnChange(fn: (trackFormDto: TrackFormDto) => void): void {
        this.propagate = fn;
    }

    registerOnTouched(fn: any): void {
        // NO-OP
    }

    writeValue(trackFormDto: TrackFormDto): void {
        if (trackFormDto) {
            this.formGenerator.patchValues(trackFormDto);
        }
    }

    getIcon(type: TrackTypes): string {
        return TrackUtils.getTrackTypeIconClass(type);
    }

    validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }
        this.formGenerator.markAsDirty();
        return false;
    }
}
