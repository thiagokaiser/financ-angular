import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ContaService } from '../../../financ/conta/conta.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-conta-form-modal',
  templateUrl: './conta-form-modal.component.html'
})
export class ContaFormModalComponent implements OnInit {

  form: UntypedFormGroup;
  submitted = false;
  idRegistro: number;
  erros = null;
  formLabel: string;
  confirmResult: Subject<any>;

  constructor(
    private fb: UntypedFormBuilder,
    private service: ContaService,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit() {
    this.confirmResult = new Subject();
    this.formLabel = 'Novo'

    this.form = this.fb.group({
      id: [null],
      descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]]
    });
  }

  onClose(){
    this.bsModalRef.hide();
  }

  onConfirm(){
    if (this.form.valid) {
      this.submitted = true;
      if (this.form.valid) {
        this.service.save(this.form.value).subscribe(
          success => {
            this.onConfirmAndClose(this.form.value);
          },
          error => {
            this.erros = error.error.errors;
            throw error
          }
        );
      }
      else{
        this.form.markAllAsTouched();
      }
    }
    else{
      this.form.markAllAsTouched();
    }
  }

  private onConfirmAndClose(result: any){
    this.confirmResult.next(result);
    this.bsModalRef.hide();
  }

}
