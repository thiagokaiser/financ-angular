import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../security/auth.interceptor';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notification.service';
import { DateFilterComponent } from '../financ/despesa/despesa-lista/date-filter/date-filter.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [    
  ConfirmModalComponent, InputContainerComponent, SnackbarComponent, DateFilterComponent
],
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  exports:[
    ConfirmModalComponent, InputContainerComponent, SnackbarComponent, DateFilterComponent
  ],
  entryComponents:[
    ConfirmModalComponent, DateFilterComponent
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders{
    return {
      ngModule: SharedModule,
      providers: [
        NotificationService,
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
      ]
    }
  }
 }
