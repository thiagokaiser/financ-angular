import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { LoginService } from './security/login/login.service';
import { loggedInGuard } from './security/loggedIn.guard';
import { ApplicationErrorHandler } from './shared/app.error-handler';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardModule } from './dashboard/dashboard.module';

registerLocaleData(localePt);

@NgModule({ declarations: [
        AppComponent
    ],
    exports: [],
    bootstrap: [AppComponent], imports: [BrowserModule,
        MatProgressSpinnerModule,
        AppRoutingModule,
        DashboardModule,
        SharedModule.forRoot()], providers: [
        LoginService,
        loggedInGuard,
        { provide: ErrorHandler, useClass: ApplicationErrorHandler },
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
