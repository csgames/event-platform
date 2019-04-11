import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SponsorRoutingModule } from "./sponsor-routing.module";
import { RoleGuard } from "src/app/guards/role.guard";

@NgModule({
    imports: [
        CommonModule,
        SponsorRoutingModule
    ],
    providers: [
        RoleGuard
    ]
})
export class SponsorModule {}
