import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../providers/authentication.service";

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    async canActivate(): Promise<boolean> {
        if (await this.authenticationService.isLoggedIn().toPromise()) {
            this.router.navigate(["/"]);
            return false;
        }
        return true;
    }
}
