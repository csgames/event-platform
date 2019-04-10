import { Component, forwardRef, OnInit, Inject } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormGroup } from "@angular/forms";
import { RestaurantSection, RestaurantCoordinate } from "../../../../../api/models/guide";
import { TranslateService } from "@ngx-translate/core";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { Subscription } from "rxjs";
import { RESTAURANT_FORM_GENERATOR } from "./restaurant-form.constants";
import { RestaurantFormDto } from "../restaurant-form/dto/restaurant-form.dto";

@Component({
    selector: "restaurant-form",
    templateUrl: "restaurant-form.template.html",
    styleUrls: ["restaurant-form.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => RestaurantFormComponent),
            multi: true
        }
    ]
})

export class RestaurantFormComponent implements OnInit, ControlValueAccessor {
    public lang: string;
    public languages = ["fr", "en"];
    public section: RestaurantSection;
    private propagate: (data: RestaurantFormDto) => void;
    public formGroup: FormGroup;
    public showCreate = false;
    public newRestaurant: RestaurantCoordinate;
    public newRestaurantError = false;
    private valueChangeSub$: Subscription;

    constructor(private translate: TranslateService, 
                @Inject(RESTAURANT_FORM_GENERATOR) private formGenerator: FormGenerator<RestaurantFormDto>) { }

    public ngOnInit() {
        this.lang = this.translate.getDefaultLang();
        this.formGroup = this.formGenerator.generateGroup();
        this.valueChangeSub$ = this.formGroup.valueChanges.subscribe(() => {
            this.propagate(this.formGenerator.getValues());
        });
    }

    public writeValue(obj: RestaurantSection) {
        if (obj) {
            this.section = obj;
        }
    }

    public registerOnChange(fn: any): void {
        this.propagate = fn;
    }

    public registerOnTouched(fn: any): void { }

    public itemChange() {
        this.propagate(this.section);
    }

    public clickAdd() {
        this.newRestaurant = {
            info: "",
            latitude: 0,
            longitude: 0
        };
        this.showCreate = true;
        this.newRestaurantError = false;
    }

    public cancel() {
        this.showCreate = false;
        this.newRestaurantError = false;
    }

    public add() {
        this.section.coordinates.push(this.newRestaurant);
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
        this.section.coordinates.splice(index, 1);
    }
}
