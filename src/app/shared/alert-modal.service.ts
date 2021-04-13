import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';

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
}
