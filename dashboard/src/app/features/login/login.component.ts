import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { State } from "./store/login.reducer";
import { select, Store } from "@ngrx/store";
import * as fromLogin from "./store/login.reducer";
import { PerformLogin } from "./store/login.actions";

@Component({
    selector: "app-login",
    templateUrl: "login.template.html",
    styleUrls: ["./login.style.scss"]
})
export class LoginComponent implements OnInit {
    loading$ = this.store$.pipe(select(fromLogin.getLoginLoading));
    error$ = this.store$.pipe(select(fromLogin.getLoginError));

    email = "";
    password = "";

    constructor(private router: Router,
                private store$: Store<State>) { }

    ngOnInit() { }

    clickSignIn() {
        this.store$.dispatch(new PerformLogin({
            email: this.email,
            password: this.password,
            remember: true
        }));
    }
}
