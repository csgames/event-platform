import { Component, ViewChild } from "@angular/core";
import { State } from "./store/forget.reducer";
import { select, Store } from "@ngrx/store";
import * as fromForget from "./store/forget.reducer";
import { PerformForget } from "./store/forget.actions";
import { ToastrService } from "ngx-toastr";
import { ForgetFormDto } from "./components/dto/forget-form-dto";
import { ForgetFormComponent } from "./components/form/forget-form.component";


@Component({
    selector: "app-forget",
    templateUrl: "forget.template.html",
    styleUrls: ["./forget.style.scss"]
})
export class ForgetComponent {
    @ViewChild(ForgetFormComponent)
    private form: ForgetFormComponent;

    forgetFormDto = new ForgetFormDto();

    loading$ = this.store$.pipe(select(fromForget.getForgetLoading));
    error$ = this.store$.pipe(select(fromForget.getForgetError));

    constructor(private store$: Store<State>) { }

    clickForget() {
        if (!this.form.validate()) { return; }
        this.store$.dispatch(new PerformForget({
            email: this.forgetFormDto.email
        }));
        this.forgetFormDto = new ForgetFormDto();
    }
}
