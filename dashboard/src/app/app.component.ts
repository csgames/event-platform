import { Component } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: "app-root",
    templateUrl: "./app.template.html",
    styleUrls: ["./app.style.scss"]
})
export class AppComponent {
    constructor(private translate: TranslateService) {
        this.translate.setDefaultLang(this.translate.getBrowserLang());
    }
}
