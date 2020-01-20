import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { PuzzleInfo, Track } from "src/app/api/models/puzzle-hero";
import { select, Store } from "@ngrx/store";
import {
    getPuzzleHeroCreatePuzzleError,
    getPuzzleHeroCreatePuzzleLoading,
    getPuzzleHeroCreatePuzzleSuccess,
    State
} from "./store/create-puzzle-hero.reducer";
import { Subscription } from "rxjs";
import { ResetState, CreatePuzzle } from "./store/create-puzzle-hero.actions";
import { QuestionFormComponent } from "../../../../../components/question-form/question-form.component";
import { QuestionFormDto } from "../../../../../components/question-form/dto/question-form.dto";

export interface CreatePuzzleHeroModal {
    info: [Track, PuzzleInfo];
}

@Component({
    selector: "app-create-puzzle-hero-modal",
    templateUrl: "create-puzzle-hero.template.html",
    styleUrls: ["create-puzzle-hero.style.scss"]
})
export class CreatePuzzleHeroComponent extends SimpleModalComponent<CreatePuzzleHeroModal, void> implements OnInit, OnDestroy {
    @ViewChild(QuestionFormComponent)
    public questionFormComponent: QuestionFormComponent;

    public info: [Track, PuzzleInfo];
    public parentPuzzle: PuzzleInfo;
    public track: Track;
    public questionFormDto: QuestionFormDto;

    loading$ = this.store$.pipe(select(getPuzzleHeroCreatePuzzleLoading));
    error$ = this.store$.pipe(select(getPuzzleHeroCreatePuzzleError));
    success$ = this.store$.pipe(select(getPuzzleHeroCreatePuzzleSuccess));

    private successSubscription$: Subscription;

    constructor(private store$: Store<State>) {
        super();
    }

    ngOnInit() {
        this.store$.dispatch(new ResetState());
        this.successSubscription$ = this.success$.subscribe((success) => {
            if (success) {
                this.close();
            }
        });

        this.track = this.info[0];
        this.parentPuzzle = this.info[1];
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.successSubscription$.unsubscribe();
    }

    public onClose() {
        this.close();
    }

    public clickSave() {
        if (this.questionFormComponent.validate()) {
            if (this.parentPuzzle && this.parentPuzzle.id) {
                this.store$.dispatch(new CreatePuzzle(this.track._id, this.parentPuzzle.id, this.questionFormDto));
            } else {
                this.store$.dispatch(new CreatePuzzle(this.track._id, null, this.questionFormDto));
            }
        }
    }
}
