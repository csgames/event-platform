import { Component, OnInit, Inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State, getFlashouts, getLoading, getSchools } from "./store/flashout-add.reducer";
import { AddFlashoutDto } from "./dto/add-flashout.dto";
import { LoadFlashouts, LoadSchools } from "./store/flashout-add.actions";
import { ADD_FLASHOUT_FORM_GENERATOR } from "./flashout-add.constants";
import { FormGenerator } from "src/app/form-generator/form-generator";

@Component({
    selector: "app-flashout-add",
    templateUrl: "flashout-add.template.html",
    styleUrls: ["./flashout-add.style.scss"]
})
export class FlashoutAddComponent implements OnInit {
    flashout$ = this.store$.pipe(select(getFlashouts));
    loading$ = this.store$.pipe(select(getLoading));
    schools$ = this.store$.pipe(select(getSchools));

    public showCreateFlashoutCard = false;

    dto = new AddFlashoutDto();

    constructor(private store$: Store<State>,
                @Inject(ADD_FLASHOUT_FORM_GENERATOR) private formGenerator: FormGenerator<AddFlashoutDto>) {}

    ngOnInit() {
        this.store$.dispatch(new LoadFlashouts());
        this.store$.dispatch(new LoadSchools());
    }

    clickAddFlashout() {
        this.showCreateFlashoutCard = true;
    }

    onCancelFlashout() {
        this.dto = new AddFlashoutDto();
        this.showCreateFlashoutCard = false;
    }
}