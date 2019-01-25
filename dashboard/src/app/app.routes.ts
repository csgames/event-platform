import { Routes } from "@angular/router";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { DASHBOARD_ROUTES } from "./features/dashboard/dashboard.routes";
import { LoginComponent } from "./features/login/login.component";
import { RegisterComponent } from "./features/register/register.component";
import { AuthenticatedGuard } from "./utils/authenticated.guard";
import { NotAuthenticatedGuard } from "./utils/not-authenticated.guard";

export const ROUTES: Routes = [


    {
        path: "login",
        component: LoginComponent,
        canActivate: [NotAuthenticatedGuard]
    },

    {
        path: "register",
        component: RegisterComponent,
        canActivate: [NotAuthenticatedGuard]
    },

    // App components
    {
        path: "",
        component: DashboardComponent,
        children: DASHBOARD_ROUTES,
        canActivate: [AuthenticatedGuard]
    }
];
