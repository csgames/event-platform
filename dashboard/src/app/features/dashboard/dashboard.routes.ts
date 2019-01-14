import { Routes } from "@angular/router";

export const DASHBOARD_ROUTES: Routes = [

    { path: "", redirectTo: "home", pathMatch: "full" },

    { path: "home", loadChildren: "./features/home/home.module#HomeModule" },
    { path: "team", loadChildren: "./features/team/team.module#TeamModule" }
];
