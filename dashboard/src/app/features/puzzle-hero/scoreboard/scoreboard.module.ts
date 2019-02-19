import { NgModule } from "@angular/core";
import { ScoreboardComponent } from "./scoreboard.component";
import { CommonModule } from "@angular/common";
import { ScoreboardRoutingModule } from "./scoreboard-routing.module";

@NgModule({
    imports: [
        CommonModule,
        ScoreboardRoutingModule
    ],
    exports: [],
    declarations: [ScoreboardComponent],
    providers: []
})
export class ScoreboardModule {}
