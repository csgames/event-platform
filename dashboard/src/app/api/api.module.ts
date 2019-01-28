import { NgModule } from "@angular/core";
import { ApiService } from "./api.service";
import { AuthApi } from "./auth.api";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AttendeeApi } from "./attendee.api";
import { EventApi } from "./event.api";
import { EventInterceptor } from "./interceptors/event.interceptor";

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: EventInterceptor, multi: true },

        AuthApi,
        AttendeeApi,
        EventApi,

        ApiService
    ]
})
export class ApiModule {}
