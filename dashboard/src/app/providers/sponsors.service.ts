import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";
import { Sponsors } from "../api/models/sponsors";
import { switchMap } from "rxjs/operators";
import { AddSponsorFormDto } from "../features/sponsors/components/sponsor-form/dto/add-sponsor.dto";

@Injectable()
export class SponsorsService {
    constructor(private apiService: ApiService) { }

    public getSponsorsList(): Observable<{ [id: string]: Sponsors[] }> {
        return this.apiService.event.getSponsorsList();
    }

    public addSponsor(sponsor: AddSponsorFormDto, tier: string): Observable<void> {
        return this.apiService.sponsor.addSponsor(sponsor).pipe(
            switchMap((id: string) => 
                this.apiService.event.addSponsorToEvent(sponsor, id, tier)
            )
        )
    }
}
