import { NgModule } from "@angular/core";
import { ApiService } from "./api.service";
import { AuthApi } from "./auth.api";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    imports: [
        HttpClientModule
    ],
    providers: [
        AuthApi,

        ApiService
    ]
})
export class ApiModule {}
