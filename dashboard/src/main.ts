import "hammerjs";
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
    enableProdMode();
}

// <HACK START> - Appeler Brandon Roberge si ça pète au 911
// Sert à ce que le scrolling dans les tracks de puzzle hero fonctionnent.
const eventListener = HTMLElement.prototype.addEventListener;
HTMLElement.prototype.addEventListener =
    function() {
        if (arguments[0] === "mousewheel") {
            return;
        } else {
            eventListener.apply(this, arguments);
        }
    };
// </HACK END>

platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err));
