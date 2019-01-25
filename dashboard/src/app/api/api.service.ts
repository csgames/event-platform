import { Injectable } from "@angular/core";
import { AuthApi } from "./auth.api";
import { AttendeeApi } from "./attendee.api";

@Injectable({
    providedIn: "root"
})
export class ApiService {

    constructor(
        private authApi: AuthApi,
        private attendeeApi: AttendeeApi
    ) { }

    public get auth(): AuthApi {
        return this.authApi;
    }

    public get attendee(): AttendeeApi {
        return this.attendeeApi;
    }
}
