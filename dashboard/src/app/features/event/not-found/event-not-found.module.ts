import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { EventNotFoundComponent } from "./event-not-found.component";
import { LottieAnimationViewModule } from "../../../components/lottie-animation-view/lottie-animation-view.module";
import { FlexModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        LottieAnimationViewModule,
        FlexModule
    ],
    declarations: [EventNotFoundComponent],
    exports: [EventNotFoundComponent]
})
export class EventNotFoundModule {}
