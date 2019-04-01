import { Component, OnInit, Input } from "@angular/core";
import { Attendee } from "src/app/api/models/attendee";
import { Store } from "@ngrx/store";
import { State } from "src/app/features/team/team-view/store/team-view.reducer";
import { DeleteAttendee } from "src/app/features/team/team-view/store/team-view.actions";

@Component({
    selector: "app-attendee-view",
    templateUrl: "./attendee-view.template.html",
    styleUrls: ["./attendee-view.style.scss"]
})
export class AttendeeViewComponent implements OnInit {

    @Input() attendee: Attendee;
    @Input() showRegister: boolean;

    constructor(private store$: Store<State>) { }

    ngOnInit() {
    }

    clickDelete() {
        this.store$.dispatch(new DeleteAttendee(this.attendee._id));
    }
}
