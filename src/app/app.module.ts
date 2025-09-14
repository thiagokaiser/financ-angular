import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { LoginService } from './security/login/login.service';
import { loggedInGuard } from './security/loggedIn.guard';
import { ApplicationErrorHandler } from './shared/app.error-handler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import {MatLegacyProgressSpinnerModule as MatProgressSpinnerModule} from '@angular/material/legacy-progress-spinner';
import { DashboardModule } from './dashboard/dashboard.module';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    AppRoutingModule,
    DashboardModule,
    ModalModule.forRoot(),
    SharedModule.forRoot()
  ],
  exports:[],
  providers: [
    LoginService, 
    loggedInGuard,
    {provide: ErrorHandler, useClass: ApplicationErrorHandler},
    {provide: LOCALE_ID, useValue: 'pt-BR'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
