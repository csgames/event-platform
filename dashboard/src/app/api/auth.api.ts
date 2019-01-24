import { GatewayApi } from "./gateway.api";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Login } from "./definitions/auth";
import { Injectable } from "@angular/core";
import { LoginDto } from "./dto/auth";

@Injectable()
export class AuthApi extends GatewayApi {
    constructor(private http: HttpClient) {
        super();
    }

    public login(dto: LoginDto): Observable<Login> {
        return this.http.post<Login>(this.url("login"), dto, { withCredentials: true });
    }
}
