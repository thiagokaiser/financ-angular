import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';
import { Perfil } from 'src/app/admin/usuario/perfil';
import { UsuarioService } from 'src/app/admin/usuario/usuario.service';

@Component({
  selector: 'app-add-perfil-modal',
  templateUrl: './add-perfil-modal.component.html'
})
export class AddPerfilModalComponent implements OnInit {

  form: UntypedFormGroup;
  submitted = false;
  idRegistro: number;
  erros = null;
  formLabel: string;
  confirmResult: Subject<any>;
  perfis = [];

  constructor(
    private fb: UntypedFormBuilder,
    private service: UsuarioService,
    public bsModalRef: BsModalRef,
  ) { }

  ngOnInit() {
    this.confirmResult = new Subject();
    this.formLabel = 'Novo'

    this.form = this.fb.group({
      usuarioId: [null],
      perfil: [null, [Validators.required]]
    });

    for (var perfil in Perfil) {
      this.perfis.push(perfil)
    }
  }

  onClose(){
    this.bsModalRef.hide();
  }

  onConfirm(){
    if (this.form.valid) {
      this.submitted = true;
      if (this.form.valid) {
        this.service.addPerfil(this.form.value.usuarioId, this.form.value.perfil).subscribe(
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
