import { NgModule } from "@angular/core";

import { HomeComponent } from "./home.component";
import { CommonModule } from "@angular/common";
import { HomeRoutingModule } from "./home-routing.module";
import { StoreModule } from "@ngrx/store";

import * as fromHome from "./store/home.reducers";
import { HomeService } from "./providers/home.service";
import { EffectsModule } from "@ngrx/effects";
import { HomeEffects } from "./store/home.effects";
import { TranslateModule } from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        HomeRoutingModule,
        TranslateModule,
        StoreModule.forFeature("home", fromHome.reducer),
        EffectsModule.forFeature([HomeEffects])
    ],
    providers: [HomeService],
    declarations: [HomeComponent]
})
export class HomeModule {}
