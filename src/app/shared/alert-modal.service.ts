import { Injectable } from '@angular/core';
import { ConfirmModalComponent, ConfirmDialogData } from './modals/confirm-modal/confirm-modal.component';
import { MonthFilterComponent, MonthFilterData } from './modals/month-filter/month-filter.component';
import { DateFilterComponent, DateFilterData } from './modals/date-filter/date-filter.component';
import { CategoriaFormModalComponent } from './modals/categoria-form-modal/categoria-form-modal.component';
import { ContaFormModalComponent } from './modals/conta-form-modal/conta-form-modal.component';
import { AddPerfilModalComponent } from './modals/add-perfil-modal/add-perfil-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private dialog: MatDialog) { }
  
  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string): Observable<boolean> {
    const dialogRef = this.dialog.open<ConfirmModalComponent, ConfirmDialogData, boolean>(ConfirmModalComponent, {
      data: {
        title,
        msg,
        okTxt,
        cancelTxt
      }
    });
    return dialogRef.afterClosed();
  }

  modalMonthFilter(dtInicial?: string, dtFinal?: string): Observable<{ dtInicial: string; dtFinal: string }> {
    const dialogRef = this.dialog.open<MonthFilterComponent, MonthFilterData, { dtInicial: string; dtFinal: string }>(MonthFilterComponent, {
      data: { dtInicial, dtFinal }
    });

    return dialogRef.afterClosed();
  }

  modalDateFilter(dtInicial?: string, dtFinal?: string): Observable<{ dtInicial: string; dtFinal: string }> {
    const dialogRef = this.dialog.open<DateFilterComponent, DateFilterData, { dtInicial: string; dtFinal: string }>(DateFilterComponent, {      
      data: { dtInicial, dtFinal }
    });
    return dialogRef.afterClosed();
  }

  modalNewCateg() {
    const dialogRef = this.dialog.open(CategoriaFormModalComponent);
    return dialogRef.afterClosed();
  }

  modalNewConta(){
    const dialogRef = this.dialog.open(ContaFormModalComponent);
    return dialogRef.afterClosed();
  }

  modalAddPerfil(usuarioId: number) {
    const dialogRef = this.dialog.open(AddPerfilModalComponent, {
      data: { usuarioId }
    });
    return dialogRef.afterClosed();
  }

}


