import { Injectable } from "@angular/core";
import { CSGamesApi } from "./csgames.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class PasswordApi extends CSGamesApi {
    constructor(private http: HttpClient) {
        super("password-reset");
    }

    public create(username: string): Observable<void> {
        return this.http.post<void>(this.url(), {
            email: username
        });
    }

    public validate(uuid: string): Observable<void> {
        return this.http.get<void>(this.url(`${uuid}`));
    }

    public resetPassword(uuid: string, password: string): Observable<void> {
        return this.http.put<void>(this.url(`${uuid}`), {
            password
        });
    }
}
