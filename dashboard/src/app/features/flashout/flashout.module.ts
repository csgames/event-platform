import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FlashoutRoutingModule } from "./flashout-routing.module";
import { RoleGuard } from "src/app/guards/role.guard";

@NgModule({
    imports: [
        CommonModule,
        FlashoutRoutingModule
    ],
    providers: [
        RoleGuard
    ]
})
export class FlashoutModule {}