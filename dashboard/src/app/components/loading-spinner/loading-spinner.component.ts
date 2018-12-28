import { Component, Input, OnInit } from "@angular/core";

@Component({
    selector: "app-loading-spinner",
    templateUrl: "loading-spinner.template.html",
    styleUrls: ["./loading-spinner.style.scss"]
})
export class LoadingSpinnerComponent implements OnInit {
    @Input()
    loading = false;

    constructor() { }

    ngOnInit() { }
}
