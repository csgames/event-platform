import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
    selector: "app-loading-spinner",
    templateUrl: "loading-spinner.template.html",
    styleUrls: ["./loading-spinner.style.scss"]
})
export class LoadingSpinnerComponent implements OnInit {
    @Input()
    loading: Observable<boolean>;

    constructor() { }

    ngOnInit() { }
}
