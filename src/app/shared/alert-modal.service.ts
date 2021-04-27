import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { ConfirmModalComponent } from './modals/confirm-modal/confirm-modal.component';
import { MonthFilterComponent } from './modals/month-filter/month-filter.component';
import { DateFilterComponent } from './modals/date-filter/date-filter.component';
import { CategoriaFormModalComponent } from './modals/categoria-form-modal/categoria-form-modal.component';
import { ContaFormModalComponent } from './modals/conta-form-modal/conta-form-modal.component';

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

  modalNewCateg(){
    const modalRef: BsModalRef = this.modalService.show(CategoriaFormModalComponent);
    return (<CategoriaFormModalComponent>modalRef.content).confirmResult;
  }

  modalNewConta(){
    const modalRef: BsModalRef = this.modalService.show(ContaFormModalComponent);
    return (<ContaFormModalComponent>modalRef.content).confirmResult;
  }

}


