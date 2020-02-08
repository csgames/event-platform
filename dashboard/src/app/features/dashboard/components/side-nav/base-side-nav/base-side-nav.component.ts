import { Router } from "@angular/router";

export class BaseSideNavComponent {
    constructor(protected router: Router) { }

    isActive(route: string | string[]) {
        if (typeof route === "string") {
            return this.router.isActive(route, false);
        }

        return route.some(x => this.router.isActive(x, false));
    }
}
