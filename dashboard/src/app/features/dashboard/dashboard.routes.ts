import { Routes } from "@angular/router";
import { NotRegisteredGuard } from "./utils/not-registered.guard";
import { RegisteredGuard } from "./utils/registered.guard";
import { EventFoundGuard } from "../../guards/event-found.guard";

export const DASHBOARD_ROUTES: Routes = [
    {
        path: "",
        redirectTo: "guide",
        pathMatch: "full"
    },
    {
        path: "event",
        loadChildren: () => import("src/app/features/event/event.module").then(m => m.EventModule)
    },
    // {
    //     path: "home",
    //     loadChildren: "src/app/features/home/home.module#HomeModule",
    //     canActivate: [RegisteredGuard]
    // },
    {
        path: "team",
        loadChildren: () => import("src/app/features/team/team.module").then(m => m.TeamModule),
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "puzzle-hero",
        loadChildren: () => import("src/app/features/puzzle-hero/puzzle-hero.module").then(m => m.PuzzleHeroModule),
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "onboarding",
        loadChildren: () => import("src/app/features/onboarding/onboarding.module").then(m => m.OnboardingModule),
        canActivate: [NotRegisteredGuard, EventFoundGuard]
    },
    {
        path: "guide",
        loadChildren: () => import("src/app/features/guide/guide.module").then(m => m.GuideModule),
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "sponsors",
        loadChildren: () => import("src/app/features/sponsors/sponsor.module").then(m => m.SponsorModule),
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "schedule",
        loadChildren: () => import("src/app/features/schedule/schedule.module").then(m => m.ScheduleModule),
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "competition",
        loadChildren: () => import("src/app/features/competitions/competitions.module").then(m => m.CompetitionsModule),
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "notifications",
        loadChildren: () => import("src/app/features/notifications/notifications.module").then(m => m.NotificationsModule),
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "flash-out",
        loadChildren: () => import("src/app/features/flashout/flashout.module").then(m => m.FlashoutModule),
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "user",
        redirectTo: "user/attendee",
        pathMatch: "full"
    },
    {
        path: "user/organizer",
        loadChildren: () => import("src/app/features/organizers/organizers.module").then(m => m.OrganizersModule),
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "user/volunteer",
        loadChildren: () => import("src/app/features/volunteers/volunteers.module").then(m => m.VolunteersModule),
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "user/director",
        loadChildren: () => import("src/app/features/directors/directors.module").then(m => m.DirectorsModule),
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "user/attendee",
        loadChildren: () => import("src/app/features/attendees/attendees.module").then(m => m.AttendeesModule),
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "activities",
        loadChildren: () => import("src/app/features/activities/activities.module").then(m => m.ActivitiesModule),
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "**",
        redirectTo: "guide",
        pathMatch: "full"
    }
];
