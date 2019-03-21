import { Component, Input, OnInit } from "@angular/core";
import { EventScore } from "../../../../../api/models/event";
import { TeamResult } from "../../../../../api/models/competition";

interface CompetitionSelect {
    _id?: string;
    name: { [lang: string]: string };
}

@Component({
    selector: "app-event-results",
    templateUrl: "event-results.template.html",
    styleUrls: ["./event-results.style.scss"]
})
export class EventResultsComponent implements OnInit {
    @Input()
    eventScore: EventScore;

    selectedCompetition: CompetitionSelect;

    competitions: CompetitionSelect[] = [];

    constructor() { }

    ngOnInit() {
        this.competitions.push(
            {
                name: {
                    "fr": "Global",
                    "en": "Overall"
                }
            },
            ...this.eventScore.competitions.map(c => {
                return {
                    _id: c._id,
                    name: c.name
                };
            })
        );
        this.selectedCompetition = this.competitions[0];
    }

    getTeamResults(): TeamResult[] {
        if (this.selectedCompetition._id) {
            return this.eventScore.competitions.find(c => c._id === this.selectedCompetition._id).results;
        }
        return this.eventScore.overall;
    }
}
