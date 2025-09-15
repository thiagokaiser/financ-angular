import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UsuarioService } from 'src/app/admin/usuario/usuario.service';
import { CommonModule } from '@angular/common';
import { Perfil } from 'src/app/admin/usuario/perfil';

export interface AddPerfilData {
  usuarioId: number;
}

@Component({
  selector: 'app-add-perfil-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-perfil-modal.component.html'
})
export class AddPerfilModalComponent implements OnInit {

  form: UntypedFormGroup;
  submitted = false;
  erros: any = null;
  formLabel = 'Novo';
  perfis: string[] = [];

  constructor(
    private fb: UntypedFormBuilder,
    private service: UsuarioService,
    public dialogRef: MatDialogRef<AddPerfilModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddPerfilData
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      usuarioId: [this.data.usuarioId],
      perfil: [null, [Validators.required]]
    });
    for (const perfil in Perfil) {
      this.perfis.push(perfil);
    }
  }

  onClose() {
    this.dialogRef.close(undefined);
  }

  onConfirm() {
    if (this.form.valid) {
      this.submitted = true;
      this.service.addPerfil(this.form.value.usuarioId, this.form.value.perfil)
        .subscribe({
          next: () => this.dialogRef.close(this.form.value),
          error: error => this.erros = error.error?.errors
        });
    } else {
      this.form.markAllAsTouched();
    }
  }

  trackByFn(index: number, item: any) {
    return index;
  }
}
