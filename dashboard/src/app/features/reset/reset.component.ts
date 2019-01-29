import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { State } from "./store/reset.reducer";
import { PerformValidate, PerformReset } from "./store/reset.actions";
import { ActivatedRoute } from "@angular/router";
import * as fromReset from "./store/reset.reducer";

@Component({
    selector: 'app-reset',
    templateUrl: 'reset.template.html',
    styleUrls: ['./reset.style.scss']
})

export class ResetComponent implements OnInit {
    loading$ = this.store$.pipe(select(fromReset.getResetLoading));
    validateError$ = this.store$.pipe(select(fromReset.getValidateError));
    resetError$ = this.store$.pipe(select(fromReset.getResetError));

    password = '';
    secondPassword = '';

    constructor(private store$: Store<State>,
                private route: ActivatedRoute) { }

    ngOnInit() {
        this.store$.dispatch(new PerformValidate({
            uuid: this.route.snapshot.paramMap.get("uuid")
        }));
    }

    clickReset() {
        this.store$.dispatch(new PerformReset({
            uuid: this.route.snapshot.paramMap.get('uuid'),
            password: this.password
        }));
    }
}