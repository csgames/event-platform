import { Event } from "../../../../../api/models/event";
import { Component, OnInit, OnDestroy, Inject } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { FormGroup } from "@angular/forms";
import { Subscription } from "rxjs";
import { COMPETITIONS_SETTINGS_FORM_GENERATOR } from "./competition-settings.constants";
import { FormGenerator } from "src/app/form-generator/form-generator";
import { Store, select } from "@ngrx/store";
import { State, getCompetitionSettingsLoading, getCompetitionSettingsError, getCompetitionSettingsSucess } from "./store/competition-settings.reducer";
import { CompetitionSettingsDto } from "./dto/competition-settings.dto";
import { CompetitionSettingsUtils } from "./competition-settings.utils";
import { ResetCompetitionSettingsState, SaveCompetitionSettings } from "./store/competition-settings.actions";

export interface CompetitionSettingsModal {
    event: Event
}

@Component({
    selector: "app-competition-settings",
    templateUrl: "competition-settings.template.html",
    styleUrls: ["./competition-settings.style.scss"]
})
export class CompetitionSettingsComponent extends SimpleModalComponent<CompetitionSettingsModal, void> implements OnInit, OnDestroy {
    loading$ = this.store$.pipe(select(getCompetitionSettingsLoading));
    error$ = this.store$.pipe(select(getCompetitionSettingsError));
    success$ = this.store$.pipe(select(getCompetitionSettingsSucess));
    
    private event: Event;
    
    public formGroup: FormGroup;

    public successSubscription$: Subscription;

    constructor(
        @Inject(COMPETITIONS_SETTINGS_FORM_GENERATOR) private formGenerator: FormGenerator<CompetitionSettingsDto>,
        private store$: Store<State>) {
                    super();
    }

    public ngOnInit() {
        this.store$.dispatch(new ResetCompetitionSettingsState());
        this.formGroup = this.formGenerator.generateGroup();
        this.formGroup.patchValue(CompetitionSettingsUtils.eventToCompetitionSettingsDto(this.event));

        this.successSubscription$ = this.success$.subscribe((success) => {
            if (success) {
                this.close();
            }
        });

    }

    public ngOnDestroy() {
        this.successSubscription$.unsubscribe();
    }

    public clickSave() {
        if (this.validate()) {
            this.store$.dispatch(new SaveCompetitionSettings(this.formGenerator.getValues()));
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
