import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Registration } from "./models/registration";
import { Injectable } from "@angular/core";

@Injectable()
export class RegistrationApi extends CSGamesApi {

    constructor(private http: HttpClient) {
        super("registration");
    }

    public getRegistration(uuid: string): Observable<Registration> {
        return this.http.get<Registration>(this.url(uuid), {
            withCredentials: true,
            headers: {
                "With-Event": "false"
            }
        });
    }
}
