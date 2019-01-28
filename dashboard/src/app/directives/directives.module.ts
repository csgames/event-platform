import { NgModule } from "@angular/core";
import { IfRoleDirective } from "./if-role.directive";
import { IfNotRoleDirective } from "./if-not-role.directive";

@NgModule({
    declarations: [IfRoleDirective, IfNotRoleDirective],
    exports: [IfRoleDirective, IfNotRoleDirective]
})
export class DirectivesModule {}
