import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ThemeService {

    defaultTheme = {
        "primary-color": "#0d5899"
    };

    oldPrimaryColor = this.defaultTheme["primary-color"];

    constructor() { }

    setPrimaryColor(color: string) {
        this.oldPrimaryColor = color;
        document.documentElement.style.setProperty("--primary-color", color);
    }

    setTemporaryPrimaryColor(color: string) {
        document.documentElement.style.setProperty("--primary-color", color);
    }

    resetPrimaryColor() {
        this.setPrimaryColor(this.oldPrimaryColor);
    }

    resetTheme() {
        Object.keys(this.defaultTheme).forEach((key) => {
            document.documentElement.style.setProperty(`--${key}`, this.defaultTheme[key]);
        });
    }
}
