import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { TrackFormDto } from "../track-form/dto/track-form.dto";
import { TrackFormComponent } from "../track-form/track-form.component";
import { select, Store } from "@ngrx/store";
import {
    getPuzzleHeroCreateTrackError,
    getPuzzleHeroCreateTrackLoading,
    getPuzzleHeroCreateTrackSuccess,
    State
} from "./store/create-track.reducer";
import { CreateTrack, ResetState } from "./store/create-track.actions";
import { Subscription } from "rxjs";

@Component({
    selector: "app-create-track",
    templateUrl: "create-track.template.html"
})
export class CreateTrackComponent extends SimpleModalComponent<void, void> implements OnInit, OnDestroy {
    @ViewChild(TrackFormComponent, { static: true })
    public trackForm: TrackFormComponent;

    public trackFormDto: TrackFormDto = new TrackFormDto();

    loading$ = this.store$.pipe(select(getPuzzleHeroCreateTrackLoading));
    error$ = this.store$.pipe(select(getPuzzleHeroCreateTrackError));
    success$ = this.store$.pipe(select(getPuzzleHeroCreateTrackSuccess));

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
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this.successSubscription$.unsubscribe();
    }

    createTrack() {
        if (this.trackForm.validate()) {
            this.store$.dispatch(new CreateTrack(this.trackFormDto));
        }
    }
}
