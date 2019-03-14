import { Component, forwardRef, Input, OnInit } from "@angular/core";
import { Flashout } from "../../../../api/models/flashout";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable, of } from "rxjs";

@Component({
    selector: "app-flashout-card",
    templateUrl: "flashout-card.template.html",
    styleUrls: ["flashout-card.style.scss"],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FlashoutCardComponent),
            multi: true
        }
    ]
})
export class FlashoutCardComponent implements OnInit, ControlValueAccessor {
    @Input()
    public flashout: Flashout;
    @Input()
    public rate: boolean;
    @Input()
    public showRate = false;
    @Input()
    public showAverageRate = false;
    @Input()
    public average: number

    public rating: number;
    public loading$: Observable<boolean>;
    public propagate: (rating: number) => void;

    constructor() {
    }

    public ngOnInit() {
        this.loading$ = of(true);
    }

    public writeValue(obj: number): void {
        this.rating = obj;
    }

    public registerOnChange(fn: (rating: number) => void): void {
        this.propagate = fn;
    }

    public registerOnTouched(fn: any): void {
    }

    public onReady() {
        this.loading$ = of(false);
    }
}
