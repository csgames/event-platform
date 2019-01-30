import { Routes } from "@angular/router";
import { RegisteredGuard } from "./utils/registered.guard";
import { NotRegisteredGuard } from "./utils/not-registered.guard";

export const DASHBOARD_ROUTES: Routes = [
    { 
        path: "",
        redirectTo: "home",
        pathMatch: "full"
    },
    {
        path: "home",
        loadChildren: "src/app/features/home/home.module#HomeModule",
        // canActivate: [RegisteredGuard]
    },
    {
        path: "team",
        loadChildren: "src/app/features/team/team.module#TeamModule",
        // canActivate: [RegisteredGuard]
    },
    {
        path: "puzzle-hero",
        loadChildren: "src/app/features/puzzle-hero/puzzle-hero.module#PuzzleHeroModule",
        // canActivate: [RegisteredGuard]
    },
    {
        path: "onboarding",
        loadChildren: "src/app/features/onboarding/onboarding.module#OnboardingModule",
        // canActivate: [NotRegisteredGuard]
    },
    {
        path: "**",
        redirectTo: "home",
        pathMatch: "full"
    }
];
