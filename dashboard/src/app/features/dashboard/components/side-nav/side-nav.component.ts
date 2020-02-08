import { Component, Input, ViewEncapsulation } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { getCurrentEvent, getNavigation, State } from "src/app/store/app.reducers";

@Component({
    selector: "app-side-nav",
    templateUrl: "side-nav.template.html",
    styleUrls: ["./side-nav.style.scss"],
    encapsulation: ViewEncapsulation.None
})
export class SideNavComponent {
    @Input()
    loading = false;

    currentEvent$ = this.store$.pipe(select(getCurrentEvent));
    navigation$ = this.store$.pipe(select(getNavigation));

    constructor(private store$: Store<State>) {}
}
