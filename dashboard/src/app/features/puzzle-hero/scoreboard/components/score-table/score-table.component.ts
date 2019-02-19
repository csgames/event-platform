import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
    selector: "app-score-table",
    templateUrl: "score-table.template.html"
})
export class ScoreTableComponent implements OnInit {

    @Input()
    selectedTeams: string[] = [];

    @Output()
    selectedTeamsChange = new EventEmitter<string[]>();

    @Input()
    scores: { teamId: string, teamName: string, schoolName: string, score: number }[];

    constructor() { }

    ngOnInit() { }

    get sortedScores() {
        return this.scores;
    }

    isSelected(teamId: string) {
        return this.selectedTeams.includes(teamId);
    }

    checkTeam(checked: boolean, teamId: string) {
        if (checked) {
            this.selectedTeams = [
                ...this.selectedTeams,
                teamId
            ];
        } else {
            this.selectedTeams = this.selectedTeams.filter(t => t !== teamId);
        }

        this.selectedTeamsChange.emit(this.selectedTeams);
    }
}
