import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AttendeesComponent } from "./attendees.component";

const routes: Routes = [
    { path: "", component: AttendeesComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AttendeesRoutingModule { }
