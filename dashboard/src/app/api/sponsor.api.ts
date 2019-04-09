import { Injectable } from "@angular/core";
import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { SponsorInfoDto } from "../features/sponsors/components/sponsor-form/dto/sponsor-info.dto";

@Injectable()
export class SponsorApi extends CSGamesApi {
    constructor(private http: HttpClient) {
        super("sponsor");
    }

    public addSponsor(sponsor: SponsorInfoDto): Observable<string> {
        const body = {
            name: sponsor.name,
            description: sponsor.description,
            website: sponsor.website,
            imageUrl: sponsor.imageUrl
        };
        return this.http.post<any>(this.url(), body, { withCredentials: true }).pipe(
            map((r) => r._id)
        );
    }

    public updateSponsor(id: string, sponsor: SponsorInfoDto): Observable<void> {
        return this.http.put<void>(this.url(id), sponsor, { withCredentials: true });
    }
}
