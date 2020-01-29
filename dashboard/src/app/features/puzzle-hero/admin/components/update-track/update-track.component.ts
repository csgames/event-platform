import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";
import { TrackFormDto } from "../track-form/dto/track-form.dto";
import { TrackFormComponent } from "../track-form/track-form.component";
import { select, Store } from "@ngrx/store";
import {
    getPuzzleHeroUpdateTrackError,
    getPuzzleHeroUpdateTrackLoading,
    getPuzzleHeroUpdateTrackSuccess,
    State
} from "./store/update-track.reducer";
import { UpdateTrack, ResetState } from "./store/update-track.actions";
import { Subscription } from "rxjs";
import { Track } from "../../../../../api/models/puzzle-hero";
import { PuzzleAdminUtils } from "../../puzzle-admin.utils";

interface UpdateTrackModal {
    track: Track;
}

@Component({
    selector: "app-update-track",
    templateUrl: "update-track.template.html"
})
export class UpdateTrackComponent extends SimpleModalComponent<UpdateTrackModal, void> implements OnInit, OnDestroy {

    private track: Track;

    @ViewChild(TrackFormComponent, { static: true })
    public trackForm: TrackFormComponent;

    public trackFormDto: TrackFormDto;

    loading$ = this.store$.pipe(select(getPuzzleHeroUpdateTrackLoading));
    error$ = this.store$.pipe(select(getPuzzleHeroUpdateTrackError));
    success$ = this.store$.pipe(select(getPuzzleHeroUpdateTrackSuccess));

    private successSubscription$: Subscription;

    constructor(private store$: Store<State>) {
        super();
    }

    ngOnInit() {
        this.trackFormDto = PuzzleAdminUtils.trackToTrackFormDto(this.track);
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

    updateTrack() {
        if (this.trackForm.validate()) {
            this.store$.dispatch(new UpdateTrack(this.track._id, this.trackFormDto));
        }
    }
}
