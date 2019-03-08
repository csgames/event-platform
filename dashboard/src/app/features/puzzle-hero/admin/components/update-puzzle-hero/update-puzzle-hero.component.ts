import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { Track, PuzzleInfo } from "src/app/api/models/puzzle-hero";
import { PuzzleFormComponent } from "../puzzle-form/puzzle-form.component";
import { PuzzleFormDto } from "../puzzle-form/dto/puzzle-form.dto";
import { Store, select } from "@ngrx/store";
import {
    getPuzzleHeroUpdatePuzzleError,
    getPuzzleHeroUpdatePuzzleLoading,
    getPuzzleHeroUpdatePuzzleSuccess,
    State
} from "./store/update-puzzle-hero.reducer";
import { Subscription } from "rxjs";
import { ResetState, UpdatePuzzle } from "./store/update-puzzle-hero.actions";

export interface UpdatePuzzleHeroModal {
    info: [Track, PuzzleInfo];
}

@Component({
    selector: "app-update-puzzle-hero-modal",
    templateUrl: "update-puzzle-hero.template.html",
    styleUrls: ["update-puzzle-hero.style.scss"]
})
export class UpdatePuzzleHeroComponent extends SimpleModalComponent<UpdatePuzzleHeroModal, void> implements OnInit, OnDestroy {
    @ViewChild(PuzzleFormComponent)
    public puzzleForm: PuzzleFormComponent;
    
    public info: [Track, PuzzleInfo];
    public puzzle: PuzzleInfo;
    public track: Track;

    public model: any;
    public puzzleFormDto: PuzzleFormDto;

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

        this.puzzleFormDto = new PuzzleFormDto();
        this.puzzleFormDto.answer = this.puzzle.question.answer;
        this.puzzleFormDto.description = this.puzzle.description;
        this.puzzleFormDto.label = this.puzzle.label;
        this.puzzleFormDto.score = this.puzzle.question.score;
        this.puzzleFormDto.type = this.puzzle.type;
        this.puzzleFormDto.validationType = this.puzzle.question.validationType;
        
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
            this.store$.dispatch(new UpdatePuzzle(this.track._id, this.puzzle.id, this.puzzleFormDto));
        }
    }
}
