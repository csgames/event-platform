import { Component, HostListener, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { State } from "./store/forget.reducer";
import { select, Store } from "@ngrx/store";
import * as fromForget from "./store/forget.reducer";
import { PerformForget } from "./store/forget.actions";
import { ToastrService } from "ngx-toastr";

@Component({
    selector: "app-forget",
    templateUrl: "forget.template.html",
    styleUrls: ["./forget.style.scss"]
})
export class ForgetComponent implements OnInit {
    loading$ = this.store$.pipe(select(fromForget.getForgetLoading));
    error$ = this.store$.pipe(select(fromForget.getForgetError));

    email = "";

    constructor(private router: Router,
                private store$: Store<State>) { }

    ngOnInit() { }

    clickForget() {
        this.store$.dispatch(new PerformForget({
            email: this.email
        }));
    }
}
