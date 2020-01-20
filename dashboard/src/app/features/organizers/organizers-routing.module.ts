import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { OrganizersComponent } from "./organizers.component";

const routes: Routes = [
    { path: "", component: OrganizersComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class OrganizersRoutingModule { }
