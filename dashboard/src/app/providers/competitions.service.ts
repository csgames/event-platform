import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";
import { Competition } from "../api/models/competition";
import { AuthCompetitionDto } from "../features/competitions/components/info-competition/dto/auth-competition.dto";

const SUBSCRIBED_COMPETITIONS = "SUBSCRIBED_COMPETITIONS";

@Injectable()
export class CompetitionsService {
    constructor(private apiService: ApiService) { }

    public getCompetitionsForEvent(): Observable<Competition[]> {
        return this.apiService.event.getCompetitions();
    }

    public getSubscribedCompetitions(): string[] {
        let subscribedCompetitions = [];
        const subscribedCompetitionsContent = localStorage.getItem(SUBSCRIBED_COMPETITIONS);
        if (subscribedCompetitionsContent) {
            subscribedCompetitions = JSON.parse(subscribedCompetitionsContent);
        }
        return subscribedCompetitions;
    }

    public toggleCompetitionSubscribed(competition: Competition)  {
        const subscribedCompetitions = this.getSubscribedCompetitions();

        let newSubscribedCompetitions = [];
        if (subscribedCompetitions.includes(competition._id)) {
            newSubscribedCompetitions = subscribedCompetitions.filter(t => t !== competition._id);
        } else {
            newSubscribedCompetitions = [
                ...subscribedCompetitions,
                competition._id
            ];
        }
        localStorage.setItem(SUBSCRIBED_COMPETITIONS, JSON.stringify(newSubscribedCompetitions));
    }

    isCompetitionSubsribed(competition: Competition): boolean {
        const subscribedCompetitions = this.getSubscribedCompetitions();
        return subscribedCompetitions.includes(competition._id);
    }

    validatePassword(competitionId: string, authCompetition: AuthCompetitionDto): Observable<void> {
        return this.apiService.competition.validatePassword(competitionId, authCompetition);
    }
}
