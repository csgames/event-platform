import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GuideRoutingModule } from "./guide-routing.module";
import { RoleGuard } from "src/app/guards/role.guard";

@NgModule({
    imports: [
        CommonModule,
        GuideRoutingModule
    ],
    providers: [
        RoleGuard
    ]
})
export class GuideModule {}
