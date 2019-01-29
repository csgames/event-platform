import { NgModule } from "@angular/core";
import { ApiService } from "./api.service";
import { AuthApi } from "./auth.api";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AttendeeApi } from "./attendee.api";
import { EventApi } from "./event.api";
import { EventInterceptor } from "./interceptors/event.interceptor";
import { RegistrationApi } from "./registration.api";
<<<<<<< HEAD
import { ForgetApi } from "./forget.api";
=======
import { TeamApi } from "./team.api";
>>>>>>> 977c6c877c236aea3c35c63456cc64a26c481ed1

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: EventInterceptor, multi: true },
        AuthApi,
        AttendeeApi,
        EventApi,
        RegistrationApi,
<<<<<<< HEAD
        ForgetApi,
=======
        TeamApi,
>>>>>>> 977c6c877c236aea3c35c63456cc64a26c481ed1
        ApiService
    ]
})
export class ApiModule {}
