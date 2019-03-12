import { Directive, DoCheck, ElementRef } from "@angular/core";

@Directive({ selector: "[track]" })
export class TrackDirective implements DoCheck {
    constructor(private el: ElementRef<HTMLElement>) { }

    ngDoCheck(): void {
        const g = this.el.nativeElement.querySelector(".nodes") as SVGElement;
        const svg = this.el.nativeElement.querySelector("svg") as SVGElement;
        const outer = this.el.nativeElement.querySelector(".ngx-charts-outer") as HTMLDivElement;
        if (!(g && svg)) { return; }
        const width = g.getBoundingClientRect().width + 50;
        const height = g.getBoundingClientRect().height + 50;
        outer.style.width = width + "px";
        outer.style.height = height + "px";
        svg.style.width = width + "px";
        svg.style.height = height + "px";
        svg.setAttribute("width", width.toString());
        svg.setAttribute("height", height.toString());
        svg.setAttribute("preserveAspectRatio", "");
    }
}
