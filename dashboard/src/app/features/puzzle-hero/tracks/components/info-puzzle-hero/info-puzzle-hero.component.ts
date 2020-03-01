import { Component, OnDestroy, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { PuzzleInfo, Track } from "src/app/api/models/puzzle-hero";
import { TranslateService } from "@ngx-translate/core";
import { select, Store } from "@ngrx/store";
import { getInfoPuzzleHeroError, getInfoPuzzleHeroLoading, getInfoPuzzleHeroSuccess, State } from "./store/info-puzzle-hero.reducer";
import { ResetState, ValidateAnswer } from "./store/info-puzzle-hero.actions";
import { Subscription } from "rxjs";
import { InputTypes, QuestionTypes } from "../../../../../api/models/question";
import { QuestionUtils } from "../../../../../utils/question.utils";
import { FormControl } from "@angular/forms";
import { UpdateQuestionAnswer } from "../../../../competitions/list/components/competition/store/competition.actions";

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

    public error = false;
    public answer: string;
    public file = new FormControl();

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
        return QuestionUtils.getQuestionTypeIconClass(this.puzzle.type);
    }

    validate() {
        switch (this.puzzle.inputType) {
            case InputTypes.Upload:
                if (!this.file.value) {
                    this.error = true;
                    return;
                } else {
                    this.error = false;
                }
                this.store$.dispatch(new ValidateAnswer(this.puzzle.id, {
                    file: this.file.value.data,
                    upload: true
                }));
                break;

            case InputTypes.String:
            case InputTypes.Code:
                if (!this.answer) {
                    this.error = true;
                    return;
                } else {
                    this.error = false;
                }
                this.store$.dispatch(new ValidateAnswer(this.puzzle.id, {
                    answer: this.answer
                }));
                break;
        }
    }
}
