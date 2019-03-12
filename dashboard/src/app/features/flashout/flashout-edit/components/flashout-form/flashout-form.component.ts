import { Component, forwardRef, Inject, Input, OnDestroy, OnInit } from "@angular/core";
import { ControlValueAccessor, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { ADD_FLASHOUT_FORM_GENERATOR } from "../../flashout-edit.constants";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { FlashoutEditDto } from "./dto/flashout-edit.dto";
import { School } from "../../../../../api/models/school";
import { Subscription } from "rxjs";

@Component({
    selector: "app-flashout-form",
    templateUrl: "flashout-form.template.html",
    styleUrls: ["flashout-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FlashoutFormComponent),
            multi: true
        }
    ]
})
export class FlashoutFormComponent implements OnInit, OnDestroy, ControlValueAccessor {
    @Input()
    schools: School[];

    public formGroup: FormGroup;
    private propagate: (dto: FlashoutEditDto) => void;
    private valueChangesSub$: Subscription;

    constructor(@Inject(ADD_FLASHOUT_FORM_GENERATOR) private formGenerator: FormGenerator<FlashoutEditDto>) {
    }

    public ngOnInit() {
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangesSub$ = this.formGroup.valueChanges.subscribe((value: FlashoutEditDto) => {
            this.propagate(value);
        });
    }

    public ngOnDestroy() {
        this.valueChangesSub$.unsubscribe();
    }

    public writeValue(obj: FlashoutEditDto): void {
        if (obj) {
            this.formGenerator.patchValues(obj);
        }
    }

    public registerOnChange(fn: any): void {
        this.propagate = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public validate() {
        if (!this.formGroup.valid) {
            this.formGenerator.markAsDirty();
        }

        return this.formGroup.valid;
    }

    public setVideoId(url: string) {
        if (!url) {
            return;
        }

        const query = url.split("?").pop();
        const queryData = query.split("&");
        let id = "";
        for (const data of queryData) {
            if (data.startsWith("v=")) {
                id = data.replace("v=", "");
            }
        }

        this.formGroup.controls.videoId.patchValue(id);
    }
}
