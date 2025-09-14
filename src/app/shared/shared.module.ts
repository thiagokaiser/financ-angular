import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { InputContainerComponent } from './input-container/input-container.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../security/auth.interceptor';
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from './messages/notification.service';
import { DateFilterComponent } from './modals/date-filter/date-filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MonthFilterComponent } from './modals/month-filter/month-filter.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoadingService } from './loading.service';
import { CategoriaFormModalComponent } from './modals/categoria-form-modal/categoria-form-modal.component';
import { ContaFormModalComponent } from './modals/conta-form-modal/conta-form-modal.component';
import { AddPerfilModalComponent } from './modals/add-perfil-modal/add-perfil-modal.component';

@NgModule({
    declarations: [
        ConfirmModalComponent, InputContainerComponent, SnackbarComponent, DateFilterComponent, MonthFilterComponent,
        NotFoundComponent, CategoriaFormModalComponent, ContaFormModalComponent, AddPerfilModalComponent
    ],
    imports: [
        CommonModule, ReactiveFormsModule
    ],
    exports: [
        ConfirmModalComponent, InputContainerComponent, SnackbarComponent
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
