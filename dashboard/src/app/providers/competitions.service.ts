import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";
import { Competition } from "../api/models/competition";
import { AuthCompetitionDto, QuestionAnswerDto } from "../api/dto/competition";

@Injectable()
export class CompetitionsService {
    constructor(private apiService: ApiService) { }

    public getCompetitionsForEvent(): Observable<Competition[]> {
        return this.apiService.event.getCompetitions();
    }

    public validatePassword(competitionId: string, authCompetition: AuthCompetitionDto): Observable<void> {
        return this.apiService.competition.validatePassword(competitionId, authCompetition);
    }

    public getInfoForCompetition(competitionId: string): Observable<Competition> {
        return this.apiService.competition.getInfoForCompetition(competitionId);
    }

    public validateQuestion(competitionId: string, questionId: string, questionAnswerDto: QuestionAnswerDto): Observable<void> {
        return this.apiService.competition.validateQuestion(competitionId, questionId, questionAnswerDto);
    }
}
