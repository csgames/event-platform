import { Routes } from "@angular/router";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { DASHBOARD_ROUTES } from "./features/dashboard/dashboard.routes";

export const ROUTES: Routes = [

    // App components
    {
        path: "",
        component: DashboardComponent,
        children: DASHBOARD_ROUTES
    },

    // Handle all other routes
    { path: "**", component: DashboardComponent }
];
