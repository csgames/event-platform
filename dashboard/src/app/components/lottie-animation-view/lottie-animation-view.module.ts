import { NgModule } from "@angular/core";
import { LottieAnimationViewCompnent } from "./lottie-animation-view.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [CommonModule],
    declarations: [LottieAnimationViewCompnent],
    exports: [LottieAnimationViewCompnent]
})
export class LottieAnimationViewModule {}
