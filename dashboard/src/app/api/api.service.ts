import { Injectable } from "@angular/core";
import { AuthApi } from "./auth.api";
import { AttendeeApi } from "./attendee.api";
import { EventApi } from "./event.api";
import { RegistrationApi } from "./registration.api";
import { PasswordApi } from "./password.api";
import { TeamApi } from "./team.api";
import { UserApi } from "./user.api";

@Injectable({
    providedIn: "root"
})
export class ApiService {

    constructor(
        private authApi: AuthApi,
        private attendeeApi: AttendeeApi,
        private eventApi: EventApi,
        private registrationApi: RegistrationApi,
        private passwordApi: PasswordApi,
        private teamApi: TeamApi,
        private userApi: UserApi
    ) { }

    public get auth(): AuthApi {
        return this.authApi;
    }

    public get attendee(): AttendeeApi {
        return this.attendeeApi;
    }

    public get event(): EventApi {
        return this.eventApi;
    }

    public get registration(): RegistrationApi {
        return this.registrationApi;
    }

    public get password(): PasswordApi {
        return this.passwordApi;
    }
    
    public get team(): TeamApi {
        return this.teamApi;
    }

    public get user(): UserApi {
        return this.userApi;
    }
}
