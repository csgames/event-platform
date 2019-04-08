import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";
import { Sponsors } from "../api/models/sponsors";
import { switchMap } from "rxjs/operators";
import { SponsorInfoDto } from "../features/sponsors/components/sponsor-form/dto/sponsor-info.dto";

@Injectable()
export class SponsorsService {
    constructor(private apiService: ApiService) { }

    public getSponsorsList(): Observable<{ [id: string]: Sponsors[] }> {
        return this.apiService.event.getSponsorsList();
    }

    public addSponsor(sponsor: SponsorInfoDto, tier: string): Observable<void> {
        return this.apiService.sponsor.addSponsor(sponsor).pipe(
            switchMap((id: string) => 
                this.apiService.event.addSponsorToEvent(id, tier)
            )
        );
    }

    public updateSponsorInfo(id: string, sponsor: SponsorInfoDto): Observable<void> {
        return this.apiService.sponsor.updateSponsor(id, sponsor);
    }
}
