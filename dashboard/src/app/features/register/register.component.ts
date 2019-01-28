import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { State } from "./store/register.reducer";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { LoadRegistration } from "./store/register.actions";

@Component({
    selector: "app-register",
    templateUrl: "register.template.html",
    styleUrls: ["./register.style.scss"]
})
export class RegisterComponent implements OnInit {

    private queryParamsSubscription$: Subscription;

    constructor(private activatedRoute: ActivatedRoute, private store$: Store<State>) { }

    ngOnInit() {
        this.queryParamsSubscription$ = this.activatedRoute.queryParams.subscribe(params => {
            this.store$.dispatch(new LoadRegistration(params["uuid"]));
        });
    }

    clickRegister() {
    }
}
