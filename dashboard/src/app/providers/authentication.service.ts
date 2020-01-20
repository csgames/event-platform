import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";
import { LoginDto } from "../api/dto/auth";
import { Login } from "../api/definitions/auth";

@Injectable()
export class AuthenticationService {
    constructor(private api: ApiService) {}

    login(dto: LoginDto): Observable<Login> {
        return this.api.auth.login(dto);
    }

    isLoggedIn(): Observable<boolean> {
        return this.api.auth.isLoggedIn();
    }

    logout(): Observable<void> {
        return this.api.auth.logout();
    }    
}
