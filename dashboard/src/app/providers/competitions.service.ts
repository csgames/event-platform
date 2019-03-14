import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";
import { Competition, Question } from "../api/models/competition";
import { AuthCompetitionDto } from "../features/competitions/components/info-competition/dto/auth-competition.dto";
import { formatDate } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";

const SUBSCRIBED_COMPETITIONS = "SUBSCRIBED_COMPETITIONS";
import { QuestionAnswerDto } from "../api/dto/competition";

@Injectable()
export class CompetitionsService {
    constructor(private apiService: ApiService,
                private translateService: TranslateService) { }

    public getCompetitionsForEvent(): Observable<Competition[]> {
        return this.apiService.event.getCompetitions();
    }

    public validatePassword(competitionId: string, authCompetition: AuthCompetitionDto): Observable<void> {
        return this.apiService.competition.validatePassword(competitionId, authCompetition);
    }

    public getNextCompetitons(competitions: Competition[]): Competition[] {
        const sorted = competitions.sort((a, b) => a.activities[0].beginDate < b.activities[0].beginDate ? -1 : 1);
        const now = new Date();
        const nextCompetitons = [];
        for (const c of sorted) {
            const date = new Date(c.activities[0].beginDate);
            if (now <= date) {
                if (nextCompetitons.length === 0) {
                    nextCompetitons.push(c);
                } else {
                    const first = new Date(nextCompetitons[0].activities[0].beginDate);
                    const day1 = formatDate(first, this.getDateFormat(), this.translateService.getDefaultLang(), "utc");
                    const time1 = formatDate(first, "h:mm a", this.translateService.getDefaultLang(), "utc");
                    const day2 = formatDate(date, this.getDateFormat(), this.translateService.getDefaultLang(), "utc");
                    const time2 = formatDate(date, "h:mm a", this.translateService.getDefaultLang(), "utc");
                    if (day1 === day2 && time1 === time2) {
                        nextCompetitons.push(c);
                    }
                }
            }
        }
        return nextCompetitons;
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
}
