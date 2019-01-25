import { NgModule } from "@angular/core";
import { ApiService } from "./api.service";
import { AuthApi } from "./auth.api";
import { HttpClientModule } from "@angular/common/http";
import { AttendeeApi } from "./attendee.api";

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        AuthApi,
        AttendeeApi,

        ApiService
    ]
})
export class ApiModule {}
