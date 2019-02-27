import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { Subscription } from "rxjs";
import { SimpleModalService } from "ngx-simple-modal";
import { State, getCompetitionsLoading, getCompetitions, getCompetitionsError } from "./store/competitions.reducer";
import { Competition } from "src/app/api/models/competition";

@Component({
    selector: "app-competitions",
    templateUrl: "competitions.template.html",
    styleUrls: ["competitions.style.scss"]
})
export class CompetitionsComponent implements OnInit {
    // competitions$ = this.store$.pipe(select(getCompetitions));
    // loading$ = this.store$.pipe(select(getCompetitionsLoading));
    // error$ = this.store$.pipe(select(getCompetitionsError));
    private competitions: Competition[] = [
        {
            "activity": {
                "_id": "5c5b41cb149a39205cc763dc",
                "name": "Relay",
                "type": "competition",
                "beginDate": "2019-03-22T19:00:00.000Z",
                "endDate": "2019-03-22T22:00:00.000Z",
                "location": "L-6611, L-6612, L-6613",
                "subscribers": null,
                "attendees": null,
                "details": {
                    "en": "On your marks, ready, code! Through this classical relay codin",
                    "fr": "À vos marques, prêt, codez! Dans cette traditionnelle compétition de code à relais, votre équipe"
                }
                
            },
            "maxMembersNumber": 2,
            "live": true,
            "members": null,
            "answers": null,
            "questions": null,
            "directors": null
        },
        {
            "activity": {
                "_id": "5c5b41cb149a39205cc763dc",
                "name": "Functional",
                "type": "competition",
                "beginDate": "2019-03-22T19:00:00.000Z",
                "endDate": "2019-03-22T22:00:00.000Z",
                "location": "L-6611, L-6612, L-6613",
                "subscribers": null,
                "attendees": null,
                "details": {
                    "en": "On your marks, ready, code! Through this classical relay codin",
                    "fr": "À vos marques, prêt, codez! Dans cette traditionnelle compétition de code à relais, votre équipe"
                }
                
            },
            "maxMembersNumber": 2,
            "live": false,
            "members": null,
            "answers": null,
            "questions": null,
            "directors": null
        }
    ];

    constructor(private store$: Store<State>,
                private modalService: SimpleModalService) {}


    public ngOnInit() {
        
    }
}
