import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Store, select } from "@ngrx/store";
import { State, getLoading, getClosing, selectChangePassword } from "./store/change-password.reducer";
import { ResetStore, PerformChangePassword } from "./store/change-password.actions";
import { Subscription } from "rxjs";
import { ChangePasswordDto } from "./dto/change-password.dto";
import { FormGroup } from "@angular/forms";
import { CHANGE_PASSWORD_GENERATOR } from "./change-password.constants";
import { FormGenerator } from "src/app/form-generator/form-generator";

@Component({
    selector: "app-change-password-modal",
    templateUrl: "change-password.template.html"
})
export class ChangePasswordComponent extends SimpleModalComponent<void, void> implements OnInit, OnDestroy {
    public formGroup: FormGroup;
    dto = new ChangePasswordDto();

    loading$ = this.store$.pipe(selectChangePassword(getLoading));
    closing$ = this.store$.pipe(selectChangePassword(getClosing));

    private closingSub$: Subscription;

    constructor(private store$: Store<State>,
                @Inject(CHANGE_PASSWORD_GENERATOR) private formGenerator: FormGenerator<ChangePasswordDto>) {
        super();
    }

    public ngOnInit() {
        this.store$.dispatch(new ResetStore());
        this.formGroup = this.formGenerator.generateGroup();
        this.formGroup.valueChanges.subscribe(() => {
            this.dto = this.formGenerator.getValues();
        });
        this.closingSub$ = this.closing$.subscribe((closing) => {
            if (closing) {
                this.close();
            }
        });
    }

    public ngOnDestroy() {
        this.closingSub$.unsubscribe();
        super.ngOnDestroy();
    }

    public clickCancel() {
        this.close();
    }

    public validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }

        this.formGenerator.markAsDirty();
        return false;
    }

    public clickSave() {
        if (!this.validate()) return;
        this.store$.dispatch(new PerformChangePassword(this.dto));
        this.dto = new ChangePasswordDto();
    }
}