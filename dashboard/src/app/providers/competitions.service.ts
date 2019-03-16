import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";
import { Competition } from "../api/models/competition";
import { AuthCompetitionDto, QuestionAnswerDto, UpdateCompetitionDto } from "../api/dto/competition";
import { CreateQuestionDto, UpdateQuestionDto } from "../api/dto/question";
import { QuestionGraphNode } from "../api/models/question";
import { CompetitionFormDto } from "../features/competitions/admin/components/competition-form/dto/competition-form.dto";

@Injectable()
export class CompetitionsService {
    constructor(private apiService: ApiService) { }

    public create(dto: CompetitionFormDto): Observable<Competition> {
        return this.apiService.competition.create(dto);
    }

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

    public createQuestion(competitionId: string, createQuestionDto: CreateQuestionDto): Observable<QuestionGraphNode> {
        return this.apiService.competition.createQuestion(competitionId, createQuestionDto);
    }

    public updateQuestion(competitionId: string, questionId: string, updateQuestionDto: UpdateQuestionDto): Observable<void> {
        return this.apiService.competition.updateQuestion(competitionId, questionId, updateQuestionDto);
    }

    public updateCompetition(competitionId: string, dto: CompetitionFormDto): Observable<void> {
        return this.apiService.competition.updateCompetition(competitionId, dto);
    }
}
