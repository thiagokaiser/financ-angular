import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputContainerComponent } from './input-container/input-container.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../security/auth.interceptor';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notification.service';
import { ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoadingService } from './loading.service';

@NgModule({
    declarations: [
        InputContainerComponent, SnackbarComponent, NotFoundComponent
    ],
    imports: [
        CommonModule, ReactiveFormsModule
    ],
    exports: [
        InputContainerComponent, SnackbarComponent
    ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders<SharedModule>{
    return {
      ngModule: SharedModule,
      providers: [
        NotificationService,
        LoadingService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
      ]
    }
  }
 }
