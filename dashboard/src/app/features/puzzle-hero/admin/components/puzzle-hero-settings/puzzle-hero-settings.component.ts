import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { FormGroup } from "@angular/forms";
import { FormGenerator } from "../../../../../form-generator/form-generator";
import { PUZZLE_HERO_SETTINGS_FORM_GENERATOR } from "./puzzle-hero-settings.constants";
import { PuzzleHeroSettingsDto } from "./dto/puzzle-hero-settings.dto";
import { PuzzleHero } from "../../../../../api/models/puzzle-hero";
import { PuzzleAdminUtils } from "../../puzzle-admin.utils";
import {
    getPuzzleHeroSettingsError,
    getPuzzleHeroSettingsLoading,
    getPuzzleHeroSettingsSuccess,
    State
} from "./store/puzzle-hero-settings.reducer";
import { select, Store } from "@ngrx/store";
import { ResetState, SaveSettings } from "./store/puzzle-hero-settings.actions";
import { Subscription } from "rxjs";

export interface PuzzleHeroSettingsModal {
    puzzleHero: PuzzleHero;
}

@Component({
    selector: "app-puzzle-hero-settings",
    templateUrl: "puzzle-hero-settings.template.html",
    styleUrls: ["./puzzle-hero-settings.style.scss"]
})
export class PuzzleHeroSettingsComponent extends SimpleModalComponent<PuzzleHeroSettingsModal, void> implements OnInit, OnDestroy {

    loading$ = this.store$.pipe(select(getPuzzleHeroSettingsLoading));
    error$ = this.store$.pipe(select(getPuzzleHeroSettingsError));
    success$ = this.store$.pipe(select(getPuzzleHeroSettingsSuccess));

    private puzzleHero: PuzzleHero;

    public formGroup: FormGroup;

    public successSubscription$: Subscription;

    constructor(@Inject(PUZZLE_HERO_SETTINGS_FORM_GENERATOR) private formGenerator: FormGenerator<PuzzleHeroSettingsDto>,
                private store$: Store<State>) {
        super();
    }

    ngOnInit() {
        this.store$.dispatch(new ResetState());
        this.formGroup = this.formGenerator.generateGroup();
        this.formGroup.patchValue(PuzzleAdminUtils.puzzleHeroToPuzzleHeroSettingsDto(this.puzzleHero));

        this.successSubscription$ = this.success$.subscribe((success) => {
            if (success) {
                this.close();
            }
        });
    }

    ngOnDestroy(): void {
        this.successSubscription$.unsubscribe();
    }

    clickSave() {
        if (this.validate()) {
            this.store$.dispatch(new SaveSettings(this.formGenerator.getValues()));
        }
    }

    validate(): boolean {
        if (this.formGroup.valid) {
            return true;
        }
        this.formGenerator.markAsDirty();
        return false;
    }
}
