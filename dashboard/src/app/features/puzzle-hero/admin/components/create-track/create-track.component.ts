import { Component, OnInit } from "@angular/core";
import { SimpleModalComponent } from "ngx-simple-modal";

@Component({
    selector: "app-create-track",
    templateUrl: "create-track.template.html"
})
export class CreateTrackComponent extends SimpleModalComponent<void, void> implements OnInit {
    constructor() {
        super();
    }

    ngOnInit() { }
}
