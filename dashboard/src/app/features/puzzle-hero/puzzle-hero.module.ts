import { NgModule } from "@angular/core";
import { PuzzleHeroComponent } from "./puzzle-hero.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { PuzzleHeroRoutingModule } from "./puzzle-hero-routing.module";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        PuzzleHeroRoutingModule
    ],
    exports: [],
    declarations: [PuzzleHeroComponent],
    providers: []
})
export class PuzzleHeroModule {}
