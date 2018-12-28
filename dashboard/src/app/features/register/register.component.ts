import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-register",
    templateUrl: "register.template.html",
    styleUrls: ["./register.style.scss"]
})
export class RegisterComponent implements OnInit {
    loading = false;

    constructor(private router: Router) { }

    ngOnInit() { }

    clickRegister() {
        this.loading = true;
        setTimeout(() => {
            this.router.navigate(["/home"]);
        }, 1000);
    }
}
