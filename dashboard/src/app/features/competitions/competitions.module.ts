import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RoleGuard } from "../../guards/role.guard";
import { CompetitionsRoutingModule } from "./competitions-routing.module";

@NgModule({
    imports: [
        CommonModule,
        CompetitionsRoutingModule
    ],
    exports: [],
    providers: [
        RoleGuard
    ]
})
export class CompetitionsModule {}
