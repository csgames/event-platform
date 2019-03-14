import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State, getFlashouts, getFlashoutLoading } from "./store/flashout.reducer";
import { Flashout, AttendeeVote } from "src/app/api/models/flashout";
import { Subscription } from "rxjs";
import { LoadFlashouts, VoteFlashouts } from "./store/flashout.actions";

@Component({
    selector: "app-flashout",
    templateUrl: "flashout-view.template.html",
    styleUrls: ["flashout-view.style.scss"]
})
export class FlashoutViewComponent implements OnInit, OnDestroy {
    flashouts$ = this.store$.pipe(select(getFlashouts));
    loading$ = this.store$.pipe(select(getFlashoutLoading));

    public flashouts: Flashout[];
    private flashoutSub$: Subscription;

    public hasVoted = false;
    public hasErrors = false;

    constructor(private store$: Store<State>) {}

    public ngOnInit() {
        this.store$.dispatch(new LoadFlashouts());
        this.flashoutSub$ = this.flashouts$.subscribe(flashouts => {
            if (flashouts.length === 0) {
                return;
            }
            this.flashouts = flashouts;
            this.flashouts.sort(() => 0.5 - Math.random());
            if (this.flashouts[0].votes.length === 0 || this.flashouts[0].votes[0].rating === 0) {
                for (const flashout of this.flashouts) {
                    flashout.votes = [];
                    flashout.votes.push({
                        rating: 0
                    });
                }
            } else {
                this.hasVoted = true;
            }
        });
    }

    public ngOnDestroy() {
        this.flashoutSub$.unsubscribe();
    }

    public updateError() {
        if (this.hasErrors) {
            this.hasErrors = false;
        }
    }

    public vote() {
        const votes: AttendeeVote[] = [];
        for (const f of this.flashouts) {
            if (f.votes[0].rating === 0) {
                this.hasErrors = true;
                return;
            }
            votes.push({
                _id: f._id,
                rating: f.votes[0].rating
            });
        }
        this.store$.dispatch(new VoteFlashouts({
            votes
        }));
    }
}
