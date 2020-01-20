import { Component, OnInit, Inject } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State } from "./store/reset.reducer";
import { PerformValidate, PerformReset } from "./store/reset.actions";
import { ActivatedRoute } from "@angular/router";
import * as fromReset from "./store/reset.reducer";
import { ResetFormDto } from "./dto/reset-form-dto";
import { FormGroup } from "@angular/forms";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { RESET_FORM_GENERATOR } from "./reset.constants";

@Component({
    selector: "app-reset",
    templateUrl: "reset.template.html",
    styleUrls: ["./reset.style.scss"]
})

export class ResetComponent implements OnInit {
    public formGroup: FormGroup;
    resetFormDto = new ResetFormDto();

    loading$ = this.store$.pipe(select(fromReset.getResetLoading));
    validateError$ = this.store$.pipe(select(fromReset.getValidateError));
    resetError$ = this.store$.pipe(select(fromReset.getResetError));

    constructor(private store$: Store<State>,
                private route: ActivatedRoute,
                @Inject(RESET_FORM_GENERATOR) private formGenerator: FormGenerator<ResetFormDto>) { }


    ngOnInit() {
        this.store$.dispatch(new PerformValidate({
            uuid: this.route.snapshot.paramMap.get("uuid")
        }));
        this.formGroup = this.formGenerator.generateGroup();
        this.formGroup.valueChanges.subscribe(() => {
            this.resetFormDto = this.formGenerator.getValues();
        });
    }

    public validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }

        this.formGenerator.markAsDirty();
        return false;
    }

    clickReset() {
        if (!this.validate()) { return; }
        this.store$.dispatch(new PerformReset({
            uuid: this.route.snapshot.paramMap.get("uuid"),
            password: this.resetFormDto.password
        }));
        this.resetFormDto = new ResetFormDto();
    }
}
