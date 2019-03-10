import { Injectable } from "@angular/core";
import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SubscriptionDto } from "../features/competitions/components/competition-card/dto/subscription.dto";
import { AuthCompetitionDto } from "../features/competitions/components/info-competition/dto/auth-competition.dto";
import { Competition } from "./models/competition";

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
        return this.http.get<Competition>(this.url(`${competitionId}`), {withCredentials: true});
    }
}
