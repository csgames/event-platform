import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { delay, map } from "rxjs/operators";

export interface Team {
    name: string;
}

@Injectable()
export class HomeService {
    fetchTeams(): Observable<Team[]> {
        return of(
            [
                {
                    name: "Team 1"
                },
                {
                    name: "Team 2"
                },
                {
                    name: "Team 3"
                }
            ]
        );
    }

}

