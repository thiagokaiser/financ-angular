import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../../financ/categoria/categoria.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-categoria-form-modal',
  templateUrl: './categoria-form-modal.component.html'
})
export class CategoriaFormModalComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  idRegistro: number;
  erros = null;
  formLabel: string;
  confirmResult: Subject<any>;

  constructor(
    private fb: FormBuilder,
    public bsModalRef: BsModalRef,
    private service: CategoriaService
  ) { }

  ngOnInit() {
    this.confirmResult = new Subject();
    this.formLabel = 'Novo'

    this.form = this.fb.group({
      id: [null],
      descricao: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      cor: ['', [Validators.required]]
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
