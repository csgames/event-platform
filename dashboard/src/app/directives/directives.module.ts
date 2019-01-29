import { NgModule } from "@angular/core";
import { IfRoleDirective } from "./if-role.directive";
import { IfNotRoleDirective } from "./if-not-role.directive";
import { ControlStatusDirective } from "./control-status.directive";

@NgModule({
    declarations: [IfRoleDirective, IfNotRoleDirective, ControlStatusDirective],
    exports: [IfRoleDirective, IfNotRoleDirective, ControlStatusDirective]
})
export class DirectivesModule {}
