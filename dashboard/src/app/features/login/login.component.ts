import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-login",
    templateUrl: "login.template.html",
    styleUrls: ["./login.style.scss"]
})
export class LoginComponent implements OnInit {
    loading = false;
    loginError = false;

    constructor(private router: Router) { }

    ngOnInit() { }

    clickSignIn() {
        this.loading = true;
        setTimeout(() => {
            this.loginError = true;
            this.loading = false;
            // this.router.navigate(["/home"]);
        }, 1000);
    }
}
