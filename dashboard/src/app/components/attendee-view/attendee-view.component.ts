import { Component, Input, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { TranslateService } from "@ngx-translate/core";
import { Attendee } from "src/app/api/models/attendee";
import { DeleteAttendee } from "src/app/features/team/team-view/store/team-view.actions";
import { State } from "src/app/features/team/team-view/store/team-view.reducer";
import swal from "sweetalert";

@Component({
    selector: "app-attendee-view",
    templateUrl: "./attendee-view.template.html",
    styleUrls: ["./attendee-view.style.scss"]
})
export class AttendeeViewComponent implements OnInit {

    @Input() attendee: Attendee;
    @Input() showRegister: boolean;

    constructor(private store$: Store<State>,
                private translateService: TranslateService) { }

    ngOnInit() {
    }

    clickDelete() {
        const title = this.translateService.instant("components.delete_attendee.sure");
        const text = this.translateService.instant("components.delete_attendee.deleted");
        const buttons = [
            this.translateService.instant("general.button.cancel"),
            this.translateService.instant("general.button.delete")
        ];
        swal({
            title,
            text,
            icon: "warning",
            buttons,
            dangerMode: true
        }).then((willDelete) => {
            if (willDelete) {
                swal(this.translateService.instant("components.delete_attendee.delete"), {
                    icon: "success"
                });
                this.store$.dispatch(new DeleteAttendee(this.attendee._id));
            } else {
                swal(this.translateService.instant("components.delete_attendee.safe"));
            }
        });
    }
}
