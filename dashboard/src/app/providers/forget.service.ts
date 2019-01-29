import { Injectable } from "@angular/core";
import { ApiService } from "../api/api.service";
import { Observable } from "rxjs";

@Injectable()
export class ForgetService {
    constructor(private api: ApiService) { }
    
    forget(email: string): Observable<void> {
        return this.api.forget.create(email);
    }
}