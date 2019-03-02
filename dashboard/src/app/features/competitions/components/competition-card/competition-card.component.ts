import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getCurrentAttendee } from "../../../../store/app.reducers";
import { Competition } from "src/app/api/models/competition";
import { State } from "src/app/features/competitions/store/competitions.reducer";
// import { ShowCompetitionInfo } from "../store/competitions.actions";
import { SimpleModalService } from "ngx-simple-modal";
import { InfoCompetitionComponent } from "../info-competition/info-competition.component";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Component({
    selector: "app-competition-card",
    templateUrl: "./competition-card.template.html",
    styleUrls: ["./competition-card.style.scss"]
})
export class CompetitionCardComponent implements OnInit {
    @Input()
    public competition: Competition;

    @Output()
    public info = new EventEmitter();
    public currentAttendee$ = this.store$.pipe(select(getCurrentAttendee));

    constructor(private store$: Store<State>,
                private modalService: SimpleModalService) {
    }

    public ngOnInit() {
    }

    public onShowInfo(competition: Competition, time: string) {
        // this.store$.dispatch(new ShowCompetitionInfo({competition, time}));
        this.modalService.addModal(InfoCompetitionComponent, {competition});
    }

    public get subscribed(): Observable<boolean> {
        return this.currentAttendee$.pipe(map(attendee => {
            if (!attendee) {
                return false;
            }

            return this.competition.activities[0].subscribers.some(x => x === attendee._id);
        }));
    }
}
