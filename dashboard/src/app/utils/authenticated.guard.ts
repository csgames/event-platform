import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthenticationService } from "../providers/authentication.service";

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    constructor(private authenticationService: AuthenticationService, private router: Router) {}

    async canActivate(): Promise<boolean> {
        if (!(await this.authenticationService.isLoggedIn().toPromise())) {
            console.log("Not authenticated");
            this.router.navigate(["/login"]);
            return false;
        }
        return true;
    }
}
