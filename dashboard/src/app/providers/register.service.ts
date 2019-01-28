import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Registration } from "../api/models/registration";
import { RegistrationApi } from "../api/registration.api";

@Injectable()
export class RegisterService {
    constructor(private registrationApi: RegistrationApi) {}

    public getRegistrationInfo(uuid: string): Observable<Registration> {
        return this.registrationApi.getRegistration(uuid);
    }
}
