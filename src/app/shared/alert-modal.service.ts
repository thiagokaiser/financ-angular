import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { MonthFilterComponent } from './month-filter/month-filter.component';
import { DateFilterComponent } from './date-filter/date-filter.component';

enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }
  
  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string){
    const modalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    modalRef.content.title = title;
    modalRef.content.msg = msg;    

    if (okTxt){
      modalRef.content.okTxt = okTxt;
    }
    if (cancelTxt){
      modalRef.content.cancelTxt = cancelTxt;
    }
    return (<ConfirmModalComponent>modalRef.content).confirmResult;
  }

  modalMonthFilter(dtInicial: string, dtFinal: string){
    const modalRef: BsModalRef = this.modalService.show(MonthFilterComponent);    
    modalRef.content.form.controls['dtInicial'].setValue(dtInicial);
    modalRef.content.form.controls['dtFinal'].setValue(dtFinal);    
    return (<MonthFilterComponent>modalRef.content).confirmResult;
  }  

  modalDateFilter(dtInicial: string, dtFinal: string){
    const modalRef: BsModalRef = this.modalService.show(DateFilterComponent);    
    modalRef.content.form.controls['dtInicial'].setValue(dtInicial);
    modalRef.content.form.controls['dtFinal'].setValue(dtFinal);    
    return (<DateFilterComponent>modalRef.content).confirmResult;
  }  

}
