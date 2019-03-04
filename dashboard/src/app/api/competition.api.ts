import { Injectable } from "@angular/core";
import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { SubscriptionDto } from "../features/competitions/components/competition-card/dto/subscription.dto";

@Injectable()
export class CompetitionApi extends CSGamesApi {
    constructor(private http: HttpClient) {
        super("competition");
    }

    public validatePassword(competitionId: string, password: string): Observable<void> {
        return this.http.post<void>(this.url(`competition/${competitionId}/validate`), { password }, { withCredentials: true });
    }

    public addSubscriptionToCompetition(subscription: SubscriptionDto) {
        return this.http.put(this.url(`${subscription.competitionId}/subscription`), {}, {
            withCredentials: true
        });
    }
}
