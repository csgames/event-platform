import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

import * as fromApp from "./store/app.reducers";
import { AppEffects } from "./store/app.effects";
import { RouterModule } from "@angular/router";
import { ROUTES } from "./app.routes";
import { DashboardModule } from "./features/dashboard/dashboard.module";
import { environment } from "../environments/environment";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { BsDropdownModule } from "ngx-bootstrap/dropdown";
import { LoginModule } from "./features/login/login.module";
import { RegisterModule } from "./features/register/register.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ApiModule } from "./api/api.module";
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient } from "@angular/common/http";
import { AuthenticationService } from "./providers/authentication.service";
import { AuthenticatedGuard } from "./utils/authenticated.guard";
import { NotAuthenticatedGuard } from "./utils/not-authenticated.guard";
import { AttendeeService } from "./providers/attendee.service";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { TeamService } from "./providers/team.service";
import { EventService } from "./providers/event.service";

export function loadFactory(http: HttpClient): TranslateHttpLoader {
    return new TranslateHttpLoader(http, "../assets/i18n/", ".json");
}

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BsDropdownModule.forRoot(),
        DashboardModule,
        LoginModule,
        RegisterModule,
        RouterModule.forRoot(ROUTES),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: loadFactory,
                deps: [HttpClient]
            }
        }),
        ApiModule,

        StoreModule.forRoot(fromApp.appReducers, { metaReducers: fromApp.appMetaReducers }),
        EffectsModule.forRoot([
            AppEffects
        ]),
        StoreRouterConnectingModule.forRoot(),
        !environment.production ? StoreDevtoolsModule.instrument() : [],
        BrowserAnimationsModule

    ],
    providers: [
        AuthenticationService,
        AttendeeService,
        EventService,
        AuthenticatedGuard,
        NotAuthenticatedGuard,
        TeamService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
