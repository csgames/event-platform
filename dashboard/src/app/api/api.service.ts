import { Injectable } from "@angular/core";
import { AuthApi } from "./auth.api";

@Injectable({
    providedIn: "root"
})
export class ApiService {

    constructor(
        private authApi: AuthApi
    ) { }

    public get auth(): AuthApi {
        return this.authApi;
    }
}
