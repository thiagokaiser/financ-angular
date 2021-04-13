import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminlteModule } from './adminlte/adminlte.module';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from './shared/shared.module';
import { LoginService } from './security/login/login.service';
import { loggedInGuard } from './security/loggedIn.guard';
import { ApplicationErrorHandler } from './shared/app.error-handler';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AdminlteModule,
    ModalModule.forRoot(),
    SharedModule.forRoot()
  ],
  exports:[],
  providers: [
    LoginService, 
    loggedInGuard,
    {provide: ErrorHandler, useClass: ApplicationErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
