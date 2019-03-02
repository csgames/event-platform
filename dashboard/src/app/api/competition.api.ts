import { Injectable } from "@angular/core";
import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class CompetitionApi extends CSGamesApi {
    constructor(private http: HttpClient) {
        super("competition");
    }

    public validatePassword(competitionId: string, password: string): Observable<void> {
        return this.http.post<void>(this.url(`competition/${competitionId}/validate`), { password }, { withCredentials: true });
    }
}
