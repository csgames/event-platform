import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.template.html",
    styleUrls: ["./app.style.scss"]
})
export class AppComponent {
    constructor(public translate: TranslateService) {
        this.translate.setDefaultLang(this.translate.getBrowserLang());
    }
}
