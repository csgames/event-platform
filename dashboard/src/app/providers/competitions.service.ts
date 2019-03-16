import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";
import { Competition, Question } from "../api/models/competition";
import { AuthCompetitionDto, QuestionAnswerDto, UpdateCompetitionDto } from "../api/dto/competition";
import { CreateQuestionDto, UpdateQuestionDto } from "../api/dto/question";
import { formatDate } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { QuestionGraphNode } from "../api/models/question";
import { CompetitionFormDto } from "../features/competitions/admin/components/competition-form/dto/competition-form.dto";
const SUBSCRIBED_COMPETITIONS = "SUBSCRIBED_COMPETITIONS";
import { QuestionAnswerDto } from "../api/dto/competition";

@Injectable()
export class CompetitionsService {
    constructor(private apiService: ApiService,
                private translateService: TranslateService) { }

    public create(dto: CompetitionFormDto): Observable<Competition> {
        return this.apiService.competition.create(dto);
    }

    public getCompetitionsForEvent(): Observable<Competition[]> {
        return this.apiService.event.getCompetitions();
    }

    public validatePassword(competitionId: string, authCompetition: AuthCompetitionDto): Observable<void> {
        return this.apiService.competition.validatePassword(competitionId, authCompetition);
    }

    public getNextCompetitions(competitions: Competition[]): Competition[] {
        const sorted = competitions.sort((a, b) => a.activities[0].beginDate < b.activities[0].beginDate ? -1 : 1);
        const now = new Date();
        const nextCompetitions = [];
        for (const c of sorted) {
            const date = new Date(c.activities[0].beginDate);
            if (now <= date) {
                if (nextCompetitions.length === 0) {
                    nextCompetitions.push(c);
                } else {
                    const first = new Date(nextCompetitions[0].activities[0].beginDate);
                    const day1 = formatDate(first, this.getDateFormat(), this.translateService.getDefaultLang(), "utc");
                    const time1 = formatDate(first, "h:mm a", this.translateService.getDefaultLang(), "utc");
                    const day2 = formatDate(date, this.getDateFormat(), this.translateService.getDefaultLang(), "utc");
                    const time2 = formatDate(date, "h:mm a", this.translateService.getDefaultLang(), "utc");
                    if (day1 === day2 && time1 === time2) {
                        nextCompetitions.push(c);
                    }
                }
            }
        }
        return nextCompetitions;
    }

    private getDateFormat(): string {
        if (this.translateService.getDefaultLang() === "en") {
            return "MMMM d";
        }

        return "d MMMM";
    }
    
    public getInfoForCompetition(competitionId: string): Observable<Competition> {
        return this.apiService.competition.getInfoForCompetition(competitionId);
    }

    public validateQuestion(competitionId: string, questionId: string, questionAnswerDto: QuestionAnswerDto): Observable<void> {
        return this.apiService.competition.validateQuestion(competitionId, questionId, questionAnswerDto);
    }

    public createQuestion(competitionId: string, createQuestionDto: CreateQuestionDto): Observable<QuestionGraphNode> {
        return this.apiService.competition.createQuestion(competitionId, createQuestionDto);
    }

    public updateQuestion(competitionId: string, questionId: string, updateQuestionDto: UpdateQuestionDto): Observable<void> {
        return this.apiService.competition.updateQuestion(competitionId, questionId, updateQuestionDto);
    }

    public updateCompetition(competitionId: string, dto: UpdateCompetitionDto): Observable<void> {
        return this.apiService.competition.updateCompetition(competitionId, dto);
    }
}
