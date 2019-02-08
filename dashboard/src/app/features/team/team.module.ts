import { NgModule } from "@angular/core";
import { TeamRoutingModule } from "./team-routing.module";
import { CommonModule } from "@angular/common";
import { RoleGuard } from "../../guards/role.guard";

@NgModule({
    imports: [
        CommonModule,
        TeamRoutingModule
    ],
    exports: [],
    declarations: [],
    providers: [
        RoleGuard
    ]
})
export class TeamModule {}
