import { Component, OnDestroy, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { PuzzleInfo, Track } from "src/app/api/models/puzzle-hero";
import { TranslateService } from "@ngx-translate/core";
import { select, Store } from "@ngrx/store";
import { getInfoPuzzleHeroError, getInfoPuzzleHeroLoading, getInfoPuzzleHeroSuccess, State } from "./store/info-puzzle-hero.reducer";
import { ResetState, ValidateAnswer } from "./store/info-puzzle-hero.actions";
import { Subscription } from "rxjs";
import { QuestionTypes } from "../../../../../api/models/question";

export interface InfoPuzzleHeroModal {
    puzzle: PuzzleInfo;
    track: Track;
}

@Component({
    selector: "app-info-puzzle-hero-modal",
    templateUrl: "info-puzzle-hero.template.html",
    styleUrls: ["info-puzzle-hero.style.scss"]
})
export class InfoPuzzleHeroComponent extends SimpleModalComponent<InfoPuzzleHeroModal, void> implements OnInit, OnDestroy {
    error$ = this.store$.pipe(select(getInfoPuzzleHeroError));
    loading$ = this.store$.pipe(select(getInfoPuzzleHeroLoading));
    success$ = this.store$.pipe(select(getInfoPuzzleHeroSuccess));

    public puzzle: PuzzleInfo;
    public track: Track;

    public answer: string;

    puzzleHeroSuccessSub$: Subscription;

    constructor(private translateService: TranslateService, private store$: Store<State>) {
        super();
    }

    ngOnInit() {
        this.puzzleHeroSuccessSub$ = this.success$.subscribe((success) => {
            if (success) {
                this.onClose();
            }
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.puzzleHeroSuccessSub$.unsubscribe();
    }

    public onClose() {
        this.close();
        this.store$.dispatch(new ResetState());
    }

    public get lang(): string {
        return this.translateService.getDefaultLang();
    }

    get icon(): string {
        switch (this.puzzle.type) {
            case QuestionTypes.Crypto:
                return "fa-key";
            case QuestionTypes.Gaming:
                return "fa-gamepad";
            case QuestionTypes.Scavenger:
                return "fa-camera-alt";
            case QuestionTypes.Sponsor:
                return "fa-gem";
        }
        return "";
    }

    validate() {
        this.store$.dispatch(new ValidateAnswer(this.puzzle.id, this.answer));
    }
}
