import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoleGuard } from "../../guards/role.guard";
import { CompetitionsRoutingModule } from "./competitions-routing.module";

@NgModule({
    imports: [
        CommonModule,
        CompetitionsRoutingModule
    ],
    declarations: [CompetitionsComponent, InfoCompetitionComponent, CompetitionCardComponent],
    entryComponents: [CompetitionsComponent, InfoCompetitionComponent],
    exports: [CompetitionsComponent, InfoCompetitionComponent, CompetitionCardComponent],
    providers: [SubscriptionService]
})
export class CompetitionsModule {}
