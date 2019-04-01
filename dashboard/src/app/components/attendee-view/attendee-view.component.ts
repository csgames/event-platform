import { Component, OnInit, Input } from "@angular/core";
import { Attendee } from "src/app/api/models/attendee";

@Component({
    selector: "app-attendee-view",
    templateUrl: "./attendee-view.template.html",
    styleUrls: ["./attendee-view.style.scss"]
})
export class AttendeeViewComponent implements OnInit {

    @Input() attendee: Attendee;
    @Input() showRegister: boolean;

    constructor() { }

    ngOnInit() {
    }

}
