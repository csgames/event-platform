import { NgModule } from "@angular/core";

import { LoadingSpinnerComponent } from "./loading-spinner.component";
import { CommonModule } from "@angular/common";
import { NgLoadingBodyDirective } from "./loading-spinner.directive";
import { FlexLayoutModule } from "@angular/flex-layout";

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule
    ],
    exports: [LoadingSpinnerComponent, NgLoadingBodyDirective],
    declarations: [LoadingSpinnerComponent, NgLoadingBodyDirective],
    providers: []
})
export class LoadingSpinnerModule {}
