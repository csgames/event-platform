import { Component, OnInit } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { interval } from "rxjs";
import { environment } from "../../environments/environment";

@Component({
    selector: "app-update",
    templateUrl: "update.template.html",
    styleUrls: ["update.style.scss"]
})
export class UpdateComponent implements OnInit {
    private CHECK_INTERVAL_MS = 6 * 60 * 60;
    public updateAvailable = false;

    constructor(private updates: SwUpdate) {}

    async ngOnInit() {
        if (environment.production) {
            try {
                this.updates.available.subscribe(() => {
                    this.updateAvailable = true;
                });
                await this.updates.checkForUpdate();
                interval(this.CHECK_INTERVAL_MS).subscribe(() => this.updates.checkForUpdate());
            } catch (e) {
                console.log("Service workers not supported.");
            }
        }
    }

    public updateApp() {
        this.updateAvailable = false;
        this.updates.activateUpdate().then(() => document.location.reload());
    }
}
