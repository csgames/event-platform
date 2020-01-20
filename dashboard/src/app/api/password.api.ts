import { Injectable } from "@angular/core";
import { IdentityApi } from "./identity.api";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Forget } from "./definitions/auth";
import { CustomEncoder } from "../utils/custom.encoder";

@Injectable()
export class PasswordApi extends IdentityApi {
    constructor(private http: HttpClient) {
        super("resetPassword");
    }

    public create(username: string): Observable<void> {
        const body = new HttpParams({
            encoder: new CustomEncoder()
        }).set("username", username);
        return this.http.post<void>(this.url(), body.toString(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }

    public validate(uuid: string): Observable<void> {
        return this.http.get<void>(this.url(`${uuid}`));
    }

    public resetPassword(uuid: string, password: string): Observable<void> {
        const body = new HttpParams({
            encoder: new CustomEncoder()
        }).set("password", password);
        return this.http.put<void>(this.url(`${uuid}`), body.toString(), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        });
    }
}
