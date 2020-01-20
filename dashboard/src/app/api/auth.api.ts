import { GatewayApi } from "./gateway.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IsLoggedIn, Login, Forget } from "./definitions/auth";
import { Injectable } from "@angular/core";
import { LoginDto } from "./dto/auth";
import { map } from "rxjs/operators";

@Injectable()
export class AuthApi extends GatewayApi {
    constructor(private http: HttpClient) {
        super();
    }

    public login(dto: LoginDto): Observable<Login> {
        return this.http.post<Login>(this.url("login"), dto, {
            withCredentials: true,
            headers: {
                "With-Event": "false"
            }
        });
    }

    public logout(): Observable<void> {
        return this.http.get<void>(this.url("logout"), {
            withCredentials: true,
            headers: {
                "With-Event": "false"
            }
        });
    }

    public isLoggedIn(): Observable<boolean> {
        return this.http.get<IsLoggedIn>(this.url("isloggedin"), {
            withCredentials: true,
            headers: {
                "With-Event": "false"
            }
        }).pipe(
            map(l => l.logged_in)
        );
    }
}
