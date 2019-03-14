import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { FormGroup } from "@angular/forms";
import { FLASHOUT_SETTINGS_FORM_GENERATOR } from "./flashout-settings.constants";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { FlashoutSettingsDto } from "./dto/flashout-settings.dto";
import { Store, select } from "@ngrx/store";
import { State, getFlashoutSettingsLoading, getFlashoutSettingsError, getFlashoutSettingsSucess } from "./store/flashout-settings.reducer";
import { ResetState, SaveSettings } from "./store/flashout-settings.actions";
import { FlashoutSettingsUtils } from "./flashout-settings.utils";
import { Event } from "../../../../api/models/event";
import { Subscription } from "rxjs";

export interface FlashoutSettingsModal {
    event: Event;
}

@Component({
    selector: "app-flashout-settings",
    templateUrl: "flashout-settings.template.html",
    styleUrls: ["./flashout-settings.style.scss"]
})
export class FlashoutSettingsComponent extends SimpleModalComponent<FlashoutSettingsModal, void> implements OnInit, OnDestroy {
    loading$ = this.store$.pipe(select(getFlashoutSettingsLoading));
    error$ = this.store$.pipe(select(getFlashoutSettingsError));
    success$ = this.store$.pipe(select(getFlashoutSettingsSucess));
    
    private event: Event;

    public formGroup: FormGroup;

    public successSubscription$: Subscription;

    constructor(@Inject(FLASHOUT_SETTINGS_FORM_GENERATOR) private formGenerator: FormGenerator<FlashoutSettingsDto>,
                private store$: Store<State>) {
        super();
    }

    public ngOnInit() {
        this.store$.dispatch(new ResetState());
        this.formGroup = this.formGenerator.generateGroup();
        this.formGroup.patchValue(FlashoutSettingsUtils.eventToFlashoutSettingsDto(this.event));

        this.successSubscription$ = this.success$.subscribe((success) => {
            if (success) {
                this.close();
            }
        });

    }

    public ngOnDestroy() {
        this.successSubscription$.unsubscribe();
    }
    
    clickSave() {
        if (this.validate()) {
            this.store$.dispatch(new SaveSettings(this.formGenerator.getValues()));
        }
    }

    public validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }

        this.formGenerator.markAsDirty();
        return false;
    }
}