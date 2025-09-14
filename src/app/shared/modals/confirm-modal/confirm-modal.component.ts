import { Component, OnInit, Input } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-confirm-modal',
    templateUrl: './confirm-modal.component.html',
    standalone: false
})
export class ConfirmModalComponent implements OnInit {

  @Input() title: string;
  @Input() msg: string;
  @Input() cancelTxt = 'Cancelar';
  @Input() okTxt = 'Sim';

  confirmResult: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.confirmResult = new Subject();
  }

  onClose(){
    this.onConfirmAndClose(false);
  }
  onConfirm(){
    this.onConfirmAndClose(true);
  }

  private onConfirmAndClose(result: boolean){    
    this.confirmResult.next(result);
    this.bsModalRef.hide();
  }
}
