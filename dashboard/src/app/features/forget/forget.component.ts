import { Component } from "@angular/core";
import { State } from "./store/forget.reducer";
import { select, Store } from "@ngrx/store";
import * as fromForget from "./store/forget.reducer";
import { PerformForget } from "./store/forget.actions";

@Component({
    selector: "app-forget",
    templateUrl: "forget.template.html",
    styleUrls: ["./forget.style.scss"]
})
export class ForgetComponent {
    loading$ = this.store$.pipe(select(fromForget.getForgetLoading));
    error$ = this.store$.pipe(select(fromForget.getForgetError));

    email = "";

    constructor(private store$: Store<State>) { }

    clickForget() {
        this.store$.dispatch(new PerformForget({
            email: this.email
        }));
    }
}
