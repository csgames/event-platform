import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable, of, Subject } from "rxjs";
import { Competition } from "../api/models/competition";
import { AuthCompetitionDto, UpdateCompetitionDto } from "../api/dto/competition";
import { CreateQuestionDto, UpdateQuestionDto } from "../api/dto/question";
import { formatDate } from "@angular/common";
import { TranslateService } from "@ngx-translate/core";
import { QuestionGraphNode } from "../api/models/question";
import { CompetitionFormDto } from "../features/competitions/admin/components/competition-form/dto/competition-form.dto";
import { QuestionAnswerDto } from "../api/dto/competition";
import { TeamCompetitionResult } from "../api/definitions/competition";
import { CompetitionSettingsDto } from "../features/competitions/admin/components/competition-settings/dto/competition-settings.dto";
import { CompetitionSettingsUtils } from "../features/competitions/admin/components/competition-settings/competition-settings.utils";
import * as io from "socket.io-client";
import { environment } from "../../environments/environment";

export enum CompetitionsMessageTypes {
    Download = "download",
    DownloadStart = "download-start",
    DownloadEnd = "download-end",
    DownloadUpdate = "download-update",
    DownloadTeam = "download-team",
    DownloadSaving = "download-saving"
}

@Injectable()
export class CompetitionsService {
    private socket = io.Socket;
    public downloadStart$ = new Subject();
    public downloadEnd$ = new Subject();
    public downloadTeam$ = new Subject();
    public downloadUpdate$ = new Subject();
    public downloadSaving$ = new Subject();

    constructor(private apiService: ApiService,
                private translateService: TranslateService) {
    }

    open() {
        this.socket = io.connect(environment.GATEWAY_URL + "/competition", {
            path: environment.SOCKET_IO_PATH
        });
        this.socket.on(CompetitionsMessageTypes.DownloadStart, (data) => {
            this.downloadStart$.next(data);
        });
        this.socket.on(CompetitionsMessageTypes.DownloadEnd, (data) => {
            this.downloadEnd$.next(data);
        });
        this.socket.on(CompetitionsMessageTypes.DownloadUpdate, (data) => {
            this.downloadUpdate$.next(data);
        });
        this.socket.on(CompetitionsMessageTypes.DownloadTeam, (data) => {
            this.downloadTeam$.next(data);
        });
        this.socket.on(CompetitionsMessageTypes.DownloadSaving, (data) => {
            this.downloadSaving$.next(data);
        });
    }

    close() {
        this.socket.close();
    }

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

    public getCompetitionResult(competitionId: string): Observable<TeamCompetitionResult[]> {
        return this.apiService.competition.getCompetitionResult(competitionId);
    }

    public getQuestionResult(eventId: string, competitionId: string, questionId: string): Observable<void> {
        this.socket.emit(CompetitionsMessageTypes.Download, {
            eventId,
            competitionId,
            questionId
        });
        return of();
    }

    public updateCompetitionSettings(dto: CompetitionSettingsDto): Observable<void> {
        return this.apiService.event.updateCompetitionResults(CompetitionSettingsUtils.competitionSettingsDtoToEvent(dto));
    }
}
