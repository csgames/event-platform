import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { TranslateService } from "@ngx-translate/core";
import { PuzzleInfo, Track, ValidationTypes, PuzzleTypes } from "src/app/api/models/puzzle-hero";
import { PuzzleFormComponent } from "../puzzle-form/puzzle-form.component";
import { PuzzleFormDto } from "../puzzle-form/dto/puzzle-form.dto";
import { select, Store } from "@ngrx/store";
import {
    getPuzzleHeroCreatePuzzleError,
    getPuzzleHeroCreatePuzzleLoading,
    getPuzzleHeroCreatePuzzleSuccess,
    State
} from "./store/create-puzzle-hero.reducer";
import { Subscription } from "rxjs";
import { ResetState, CreatePuzzle } from "./store/create-puzzle-hero.actions";

export interface CreatePuzzleHeroModal {
    info: [Track, PuzzleInfo];
}

@Component({
    selector: "app-create-puzzle-hero-modal",
    templateUrl: "create-puzzle-hero.template.html",
    styleUrls: ["create-puzzle-hero.style.scss"]
})
export class CreatePuzzleHeroComponent extends SimpleModalComponent<CreatePuzzleHeroModal, void> implements OnInit, OnDestroy {
    @ViewChild(PuzzleFormComponent)
    public puzzleForm: PuzzleFormComponent;

    public info: [Track, PuzzleInfo];
    public parentPuzzle: PuzzleInfo;
    public track: Track;

    public model: any;
    public puzzleFormDto: PuzzleFormDto;

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
        if (this.puzzleForm.validate()) {
            if (this.parentPuzzle && this.parentPuzzle.id) {
                this.store$.dispatch(new CreatePuzzle(this.track._id, this.parentPuzzle.id, this.puzzleFormDto));
            } else {
                this.store$.dispatch(new CreatePuzzle(this.track._id, null, this.puzzleFormDto));
            }
        }
    }
}
