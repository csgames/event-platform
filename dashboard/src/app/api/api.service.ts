import { Injectable } from "@angular/core";
import { AuthApi } from "./auth.api";
import { AttendeeApi } from "./attendee.api";
import { EventApi } from "./event.api";
import { RegistrationApi } from "./registration.api";
<<<<<<< HEAD
import { ForgetApi } from "./forget.api";
=======
import { TeamApi } from "./team.api";
>>>>>>> 977c6c877c236aea3c35c63456cc64a26c481ed1

@Injectable({
    providedIn: "root"
})
export class ApiService {

    constructor(
        private authApi: AuthApi,
        private attendeeApi: AttendeeApi,
        private eventApi: EventApi,
        private registrationApi: RegistrationApi,
<<<<<<< HEAD
        private forgetApi: ForgetApi
=======
        private teamApi: TeamApi
>>>>>>> 977c6c877c236aea3c35c63456cc64a26c481ed1
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

<<<<<<< HEAD
    public get forget(): ForgetApi {
        return this.forgetApi;
=======
    public get team(): TeamApi {
        return this.teamApi;
>>>>>>> 977c6c877c236aea3c35c63456cc64a26c481ed1
    }
}
