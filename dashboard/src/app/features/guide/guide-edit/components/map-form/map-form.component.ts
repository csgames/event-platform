import { Component, forwardRef, OnInit, Inject } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from "@angular/forms";
import { SchoolSection } from "../../../../../api/models/guide";
import { TranslateService } from "@ngx-translate/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { Subscription } from "rxjs";
import { MAP_FORM_GENERATOR } from "./map-form.constants";
import { SchoolFormDto } from "../school-form/dto/school-form.dto";

@Component({
    selector: "map-form",
    templateUrl: "map-form.template.html",
    styleUrls: ["map-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MapFormComponent),
            multi: true
        }
    ]
})
export class MapFormComponent implements OnInit, ControlValueAccessor {
    public lang: string;
    public languages = ["fr", "en"];
    public section: SchoolSection;
    private propagate: (data: SchoolFormDto) => void;
    public formGroup: FormGroup;
    public showCreate = false;
    public newMap: string;
    public newMapError = false;
    private valueChangeSub$: Subscription;

    constructor(private translate: TranslateService, @Inject(MAP_FORM_GENERATOR) private formGenerator: FormGenerator<SchoolFormDto>) {
    }

    public ngOnInit() {
        this.lang = this.translate.getDefaultLang();
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    public writeValue(obj: SchoolSection) {
        if (obj) {
            this.section = obj;
        }
    }

    public registerOnChange(fn: any): void {
        this.propagate = fn;
    }

    public registerOnTouched(fn: any): void { }

    public itemSchoolChange() {
        this.propagate(this.section);
    }

    public itemMapChange(index: number, map: string) {
        this.section.maps[index] = map;
        this.propagate(this.section);
    }

    public clickAdd() {
        this.newMap = "";
        this.showCreate = true;
        this.newMapError = false;
    }

    public cancel() {
        this.showCreate = false;
        this.newMapError = false;
    }

    public add() {
        this.section["maps"].push(this.newMap);
        this.propagate(this.section);
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
        this.section.maps.splice(index, 1);
    }
}
