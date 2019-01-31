import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";
import { Sponsors } from "../api/models/sponsors";

@Injectable()
export class SponsorsService {
    constructor(private apiService: ApiService) { }

    public getSponsorsList(): Observable<{ [id: string]: Sponsors[] }> {
        return this.apiService.event.getSponsorsList();
    }
}