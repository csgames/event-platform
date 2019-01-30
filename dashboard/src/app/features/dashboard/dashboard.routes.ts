import { Routes } from "@angular/router";

export const DASHBOARD_ROUTES: Routes = [
    { 
        path: "",
        redirectTo: "team",
        pathMatch: "full"
    },
    // {
    //     path: "home",
    //     loadChildren: "src/app/features/home/home.module#HomeModule",
    // },
    {
        path: "team",
        loadChildren: "src/app/features/team/team.module#TeamModule",
    },
    // {
    //     path: "puzzle-hero",
    //     loadChildren: "src/app/features/puzzle-hero/puzzle-hero.module#PuzzleHeroModule",
    // },
    {
        path: "onboarding",
        loadChildren: "src/app/features/onboarding/onboarding.module#OnboardingModule",
    },
    {
        path: "**",
        redirectTo: "team",
        pathMatch: "full"
    }
];
