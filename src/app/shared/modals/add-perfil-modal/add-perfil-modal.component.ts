import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Subject } from 'rxjs';
import { Perfil } from 'src/app/admin/usuario/perfil';
import { UsuarioService } from 'src/app/admin/usuario/usuario.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-perfil-modal',
  templateUrl: './add-perfil-modal.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AddPerfilModalComponent implements OnInit {
  form: UntypedFormGroup;
  submitted = false;
  erros = null;
  formLabel: string;
  confirmResult: Subject<any>;
  perfis:string[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private service: UsuarioService,
    public dialogRef: MatDialogRef<AddPerfilModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.confirmResult = new Subject();
    this.formLabel = 'Novo';
    this.form = this.fb.group({
      usuarioId: [this.data.usuarioId],
      perfil: [null, [Validators.required]]
    });

    for (var perfil in Perfil) {
      this.perfis.push(perfil)
    }
  }

  onClose() {
    this.dialogRef.close();
  }

  onConfirm() {
    console.log(this.form)
    if (this.form.valid) {
      this.submitted = true;
      this.service.addPerfil(this.form.value.usuarioId, this.form.value.perfil)
            .subscribe({
        next: success => {
          this.confirmResult.next(this.form.value);
          this.dialogRef.close();
        },
        error: error => {
          this.erros = error.error.errors;
          throw error;
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  trackByFn(index: number, item: any) {
    return index;
  }
}
