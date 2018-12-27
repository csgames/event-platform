import { Routes } from "@angular/router";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { DASHBOARD_ROUTES } from "./features/dashboard/dashboard.routes";
import { LoginComponent } from "./features/login/login.component";

export const ROUTES: Routes = [

    // App components
    {
        path: "",
        component: DashboardComponent,
        children: DASHBOARD_ROUTES
    },

    {
        path: "login",
        component: LoginComponent
    },

    // Handle all other routes
    { path: "**", component: DashboardComponent }
];
