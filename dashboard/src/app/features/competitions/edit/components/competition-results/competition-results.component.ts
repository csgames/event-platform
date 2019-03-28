import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TeamCompetitionResult } from "../../../../../api/definitions/competition";
import { TeamResult } from "../../../../../api/models/competition";
import { QuestionGraphNode } from "../../../../../api/models/question";
import idx from "idx";

interface TeamResultViewModel extends TeamResult {
    teamName: string;
    answers: QuestionGraphNode[];
}

@Component({
    selector: "app-competition-results",
    templateUrl: "competition-results.template.html",
    styleUrls: ["./competition-results.style.scss"]
})
export class CompetitionResultsComponent implements OnInit {

    private _questions: QuestionGraphNode[];
    private _teamCompetitionResults: TeamCompetitionResult[];

    @Input()
    set teamCompetitionResults(results: TeamCompetitionResult[]) {
        const oldTeamCompetitionResults = this._teamCompetitionResults;
        this._teamCompetitionResults = results;
        if (oldTeamCompetitionResults) {
            this.init();
        }
    }

    @Input()
    set questions(questions: QuestionGraphNode[]) {
        const oldQuestions = this._questions;
        this._questions = questions;
        if (oldQuestions) {
            this.init();
        }
    }

    @Input()
    teamResults: TeamResult[];

    @Output()
    teamResultChange = new EventEmitter<TeamResult[]>(true);

    public teamScoreResults: TeamResultViewModel[];

    constructor() { }

    ngOnInit() {
        this.init();
    }

    init() {
        this.teamScoreResults = this._teamCompetitionResults
            .map(tcr => {
                const answeredQuestions = tcr.answers.map(a => this._questions.find(q => q.question._id === a));
                let score = idx(this.teamResults.find(tr => tr.teamId === tcr._id), _ => _.score);
                if (!score) {
                    score = answeredQuestions
                        .filter(q => q.question.validationType !== "none")
                        .reduce((acc, q) => acc + q.question.score, 0);
                }
                return {
                    teamName: tcr.name,
                    teamId: tcr._id,
                    score: score || 0,
                    answers: answeredQuestions
                };
            })
            .sort((a, b) => b.score - a.score);
        this.emitResultsUpdate();
    }

    onUpdateScore(teamScoreResult: TeamResultViewModel, newScore: number) {
        teamScoreResult.score = newScore;
        this.emitResultsUpdate();
    }

    emitResultsUpdate() {
        this.teamResultChange.emit(this.teamScoreResults.map(tsr => {
            return {
                teamId: tsr.teamId,
                score: tsr.score
            };
        }));
    }

    get topScore() {
        return Math.max(...this.teamScoreResults.map(tsr => tsr.score));
    }

    get sortedTeamScoreResults() {
        return this.teamScoreResults.slice().sort((a, b) => b.score - a.score);
    }

    getPercentageScore(score: number) {
        return ((score / this.topScore) * 100).toFixed(2) + "%";
    }

    getPosition(teamScoreResult: TeamResultViewModel) {
        return this.sortedTeamScoreResults.indexOf(teamScoreResult) + 1;
    }
}
