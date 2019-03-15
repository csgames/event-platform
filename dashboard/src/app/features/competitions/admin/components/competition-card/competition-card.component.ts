import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Competition } from "src/app/api/models/competition";

@Component({
    selector: "app-competition-card",
    templateUrl: "./competition-card.template.html",
    styleUrls: ["./competition-card.style.scss"]
})
export class CompetitionCardComponent {
    @Input()
    public competition: Competition;

    @Output()
    public edit = new EventEmitter();

    constructor() { }
}
