import { Injectable } from "@angular/core";
import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Team } from "./models/team";
import { Observable } from "rxjs";

@Injectable()
export class TeamApi extends CSGamesApi {
    constructor(private http: HttpClient) {
        super("team");
    }

    public getTeam(): Observable<Team> {
        return this.http.get<Team>(this.url("info"), { withCredentials: true });
    }

    public updateTeamName(name: string, id: string): Observable<void> {
        return this.http.put<void>(this.url(`${id}`), { name }, { withCredentials: true});
    }
}
