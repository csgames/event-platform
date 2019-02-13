import { Routes } from "@angular/router";
import { NotRegisteredGuard } from "./utils/not-registered.guard";
import { RegisteredGuard } from "./utils/registered.guard";

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
        canActivate: [RegisteredGuard]
    },
    // {
    //     path: "puzzle-hero",
    //     loadChildren: "src/app/features/puzzle-hero/puzzle-hero.module#PuzzleHeroModule",
    // },
    {
        path: "onboarding",
        loadChildren: "src/app/features/onboarding/onboarding.module#OnboardingModule",
        canActivate: [NotRegisteredGuard]
    },
    {
        path: "guide",
        loadChildren: "src/app/features/guide/guide.module#GuideModule",
    },
    {
        path: "sponsors",
        loadChildren: "src/app/features/sponsors/sponsors.module#SponsorsModule",
        canActivate: [RegisteredGuard]
    },
    {
        path: "**",
        redirectTo: "team",
        pathMatch: "full"
    }
];
