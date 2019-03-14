import { Injectable } from "@angular/core";
import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Competition } from "./models/competition";
import { AuthCompetitionDto, QuestionAnswerDto, SubscriptionDto } from "./dto/competition";

@Injectable()
export class CompetitionApi extends CSGamesApi {
    constructor(private http: HttpClient) {
        super("competition");
    }

    public validatePassword(competitionId: string, authCompetition: AuthCompetitionDto): Observable<void> {
        return this.http.post<void>(this.url(`${competitionId}/auth`), authCompetition, { withCredentials: true });
    }

    public addSubscriptionToCompetition(subscription: SubscriptionDto) {
        return this.http.put(this.url(`${subscription.competitionId}/subscription`), {}, {
            withCredentials: true
        });
    }

    public getInfoForCompetition(competitionId: string): Observable<Competition> {
        return this.http.get<Competition>(this.url(`${competitionId}`), { withCredentials: true });
    }

    public validateQuestion(competitionId: string, questionId: string, questionAnswerDto: QuestionAnswerDto): Observable<void> {
        const form = new FormData();
        for (const key in questionAnswerDto) {
            if (key in questionAnswerDto) {
                form.append(key, questionAnswerDto[key]);
            }
        }

        return this.http.post<void>(this.url(`${competitionId}/question/${questionId}/validate`), form, {
            withCredentials: true
        });
    }
}
