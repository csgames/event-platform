import { AfterViewInit, Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformServer } from "@angular/common";

declare let require: any;
const lottie: any = require("lottie-web/build/player/lottie.js");

@Component({
    selector: "lottie-animation-view",
    templateUrl: "lottie-animation-view.template.html"
})
export class LottieAnimationViewCompnent implements OnInit, AfterViewInit {
    private _options: any;

    @Input()
    public options: any;
    @Input()
    public width: number;
    @Input()
    public height: number;

    @Output()
    public animCreated: EventEmitter<any> = new EventEmitter();

    @ViewChild("animationContainer")
    public animationContainer: ElementRef;

    public viewWidth: string;
    public viewHeight: string;

    constructor(@Inject(PLATFORM_ID) private platformId: string) {
    }

    public ngOnInit() {
        this.viewWidth = this.width + "px" || "100%";
        this.viewHeight = this.height + "px" || "100%";
    }

    public ngAfterViewInit() {
        if (isPlatformServer(this.platformId)) {
            return;
        }

        this._options = {
            container: this.animationContainer.nativeElement,
            renderer: this.options.renderer || "svg",
            loop: this.options.loop !== false,
            autoplay: this.options.autoplay !== false,
            autoloadSegments: this.options.autoloadSegments !== false,
            animationData: this.options.animationData,
            path: this.options.path || "",
            rendererSettings: this.options.rendererSettings || {}
        };

        const anim: any = lottie.loadAnimation(this._options);
        this.animCreated.emit(anim);
    }
}
