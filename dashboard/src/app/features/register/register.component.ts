import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { getRegisterError, getRegisterLoading, getRegisterRegistrationInfo, State } from "./store/register.reducer";
import { select, Store } from "@ngrx/store";
import { UserFormDto } from "../../components/user-form/dto/user-form.dto";
import { UserFormComponent } from "../../components/user-form/user-form.component";
import { LoadRegistration, PerformRegistration } from "./store/register.actions";
import { Subscription } from "rxjs";

@Component({
    selector: "app-register",
    templateUrl: "register.template.html",
    styleUrls: ["./register.style.scss"]
})
export class RegisterComponent implements OnInit, OnDestroy {

    userFormDto = new UserFormDto();

    error$ = this.store$.pipe(select(getRegisterError));
    loading$ = this.store$.pipe(select(getRegisterLoading));
    registration$ = this.store$.pipe(select(getRegisterRegistrationInfo));

    private queryParamsSub$: Subscription;
    private registrationSub$: Subscription;

    @ViewChild(UserFormComponent)
    private userForm: UserFormComponent;

    private uuid: string;

    constructor(private activatedRoute: ActivatedRoute, private store$: Store<State>) { }

    ngOnInit() {
        this.queryParamsSub$ = this.activatedRoute.queryParams.subscribe(queryParams => {
            this.uuid = queryParams["uuid"];
            this.store$.dispatch(new LoadRegistration(this.uuid));
        });

        this.registrationSub$ = this.registration$.subscribe(registration => {
            if (!registration) {
                return;
            }
            this.userFormDto = {
                firstName: registration.attendee.firstName,
                lastName: registration.attendee.lastName,
                username: registration.attendee.email,
                password: "",
                confirmPassword: ""
            };
        });
    }

    ngOnDestroy() {
        this.queryParamsSub$.unsubscribe();
    }

    clickRegister() {
        if (!this.userForm.validate()) {
            return;
        }
        this.store$.dispatch(new PerformRegistration({
            uuid: this.uuid,
            userFormDto: this.userFormDto
        }));
    }
}
