import { Component, ContentChild, Input, OnInit, TemplateRef } from "@angular/core";
import { Observable } from "rxjs";
import { NgLoadingBodyDirective } from "./loading-spinner.directive";

@Component({
    selector: "app-loading-spinner",
    templateUrl: "loading-spinner.template.html",
    styleUrls: ["./loading-spinner.style.scss"]
})
export class LoadingSpinnerComponent implements OnInit {
    @Input()
    loading: Observable<boolean>;

    @ContentChild(NgLoadingBodyDirective, { read: TemplateRef, static: true })
    public loadingBodyRef: TemplateRef<any>;

    constructor() { }

    public ngOnInit() { }
}
