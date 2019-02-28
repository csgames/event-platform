import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";
import { Competition } from "../api/models/competition";

@Injectable()
export class CompetitionsService {
    constructor(private apiService: ApiService) { }

    public getCompetitionsForEvent(): Observable<Competition[]> {
        return this.apiService.event.getCompetitions();
    }

    public getSubscribedCompetitions(): Observable<string[]> {
        return null;
    }

    public toggleCompetitionSubscribed(): Observable<Competition> {
        return null;
    }
}
