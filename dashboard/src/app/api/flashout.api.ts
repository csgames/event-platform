import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { School } from "./models/school";
import { Injectable } from "@angular/core";
import { Flashout } from "./models/flashout";

@Injectable()
export class FlashoutApi extends CSGamesApi {
    constructor(private http: HttpClient) {
        super("flash-out");
    }

    public create(flashout: Flashout): Observable<Flashout> {
        return this.http.post<Flashout>(this.url(), flashout, { withCredentials: true });
    }
}
