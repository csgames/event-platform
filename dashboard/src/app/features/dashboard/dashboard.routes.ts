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
        loadChildren: "src/app/features/event/event.module#EventModule"
    },
    // {
    //     path: "home",
    //     loadChildren: "src/app/features/home/home.module#HomeModule",
    //     canActivate: [RegisteredGuard]
    // },
    {
        path: "team",
        loadChildren: "src/app/features/team/team.module#TeamModule",
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "puzzle-hero",
        loadChildren: "src/app/features/puzzle-hero/puzzle-hero.module#PuzzleHeroModule",
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "onboarding",
        loadChildren: "src/app/features/onboarding/onboarding.module#OnboardingModule",
        canActivate: [NotRegisteredGuard, EventFoundGuard]
    },
    {
        path: "guide",
        loadChildren: "src/app/features/guide/guide.module#GuideModule",
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "sponsors",
        loadChildren: "src/app/features/sponsors/sponsor.module#SponsorModule",
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "schedule",
        loadChildren: "src/app/features/schedule/schedule.module#ScheduleModule",
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "competition",
        loadChildren: "src/app/features/competitions/competitions.module#CompetitionsModule",
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "notifications",
        loadChildren: "src/app/features/notifications/notifications.module#NotificationsModule",
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "flash-out",
        loadChildren: "src/app/features/flashout/flashout.module#FlashoutModule",
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "user",
        redirectTo: "user/attendee",
        pathMatch: "full"
    },
    {
        path: "user/organizer",
        loadChildren: "src/app/features/organizers/organizers.module#OrganizersModule",
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "user/volunteer",
        loadChildren: "src/app/features/volunteers/volunteers.module#VolunteersModule",
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "user/director",
        loadChildren: "src/app/features/directors/directors.module#DirectorsModule",
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "user/attendee",
        loadChildren: "src/app/features/attendees/attendees.module#AttendeesModule",
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "activities",
        loadChildren: "src/app/features/activities/activities.module#ActivitiesModule",
        canActivate: [RegisteredGuard, EventFoundGuard]
    },
    {
        path: "**",
        redirectTo: "guide",
        pathMatch: "full"
    }
];
