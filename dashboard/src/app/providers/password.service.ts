import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";

@Injectable()
export class PasswordService {
    constructor(private api: ApiService) { }
    
    forget(email: string): Observable<void> {
        return this.api.password.create(email);
    }

    validate(uuid: string): Observable<void> {
        return this.api.password.validate(uuid);
    }

    reset(uuid: string, password: string): Observable<void> {
        return this.api.password.resetPassword(uuid, password);
    }
}
