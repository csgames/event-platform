import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { School } from "./models/school";
import { Injectable } from "@angular/core";

@Injectable()
export class SchoolApi extends CSGamesApi {
    constructor(private http: HttpClient) {
        super("school");
    }

    public getAll(): Observable<School[]> {
        return this.http.get<School[]>(this.url(), { withCredentials: true });
    }
}
