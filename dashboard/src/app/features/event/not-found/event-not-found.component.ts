import { Component, ViewEncapsulation } from "@angular/core";

@Component({
    selector: "event-not-found",
    templateUrl: "event-not-found.template.html",
    styleUrls: ["event-not-found.style.scss"],
    encapsulation: ViewEncapsulation.None
})
export class EventNotFoundComponent {
    public lottieConfig = {
        path: "assets/animations/404.json",
        autoplay: true,
        loop: true
    };

    public handleAnimation(animation) {
        animation.setSpeed(2.0);
    }
}
