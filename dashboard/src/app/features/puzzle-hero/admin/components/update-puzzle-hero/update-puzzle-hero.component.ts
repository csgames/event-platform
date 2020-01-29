import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Track, PuzzleInfo } from "src/app/api/models/puzzle-hero";
import { Store, select } from "@ngrx/store";
import {
    getPuzzleHeroUpdatePuzzleError,
    getPuzzleHeroUpdatePuzzleLoading,
    getPuzzleHeroUpdatePuzzleSuccess,
    State
} from "./store/update-puzzle-hero.reducer";
import { Subscription } from "rxjs";
import { ResetState, UpdatePuzzle } from "./store/update-puzzle-hero.actions";
import { QuestionFormComponent } from "../../../../../components/question-form/question-form.component";
import { QuestionFormDto } from "../../../../../components/question-form/dto/question-form.dto";

export interface UpdatePuzzleHeroModal {
    info: [Track, PuzzleInfo];
}

@Component({
    selector: "app-update-puzzle-hero-modal",
    templateUrl: "update-puzzle-hero.template.html",
    styleUrls: ["update-puzzle-hero.style.scss"]
})
export class UpdatePuzzleHeroComponent extends SimpleModalComponent<UpdatePuzzleHeroModal, void> implements OnInit, OnDestroy {
    @ViewChild(QuestionFormComponent, { static: true })
    public puzzleForm: QuestionFormComponent;

    public info: [Track, PuzzleInfo];
    public puzzle: PuzzleInfo;
    public track: Track;

    public questionFormDto: QuestionFormDto;

    loading$ = this.store$.pipe(select(getPuzzleHeroUpdatePuzzleLoading));
    error$ = this.store$.pipe(select(getPuzzleHeroUpdatePuzzleError));
    success$ = this.store$.pipe(select(getPuzzleHeroUpdatePuzzleSuccess));

    private successSubscription$: Subscription;

    constructor(private store$: Store<State>) {
        super();
    }

    ngOnInit() {
        this.track = this.info[0];
        this.puzzle = this.info[1];

        this.questionFormDto = new QuestionFormDto();
        this.questionFormDto.answer = this.puzzle.question.answer;
        this.questionFormDto.description = this.puzzle.description;
        this.questionFormDto.label = this.puzzle.label;
        this.questionFormDto.score = this.puzzle.question.score;
        this.questionFormDto.type = this.puzzle.type;
        this.questionFormDto.validationType = this.puzzle.question.validationType;
        this.questionFormDto.inputType = this.puzzle.question.inputType;

        this.store$.dispatch(new ResetState());
        this.successSubscription$ = this.success$.subscribe((success) => {
            if (success) {
                this.close();
            }
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.successSubscription$.unsubscribe();
    }

    public onClose() {
        this.close();
    }

    public clickSave() {
        if (this.puzzleForm.validate()) {
            this.store$.dispatch(new UpdatePuzzle(this.track._id, this.puzzle.id, this.questionFormDto));
        }
    }
}
