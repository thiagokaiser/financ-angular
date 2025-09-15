import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoriaService } from '../../../financ/categoria/categoria.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-categoria-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './categoria-form-modal.component.html'
})
export class CategoriaFormModalComponent implements OnInit {
  form: UntypedFormGroup;
  submitted = false;
  erros: any = null;
  formLabel: string;

  constructor(
    private fb: UntypedFormBuilder,
    private service: CategoriaService,
    public dialogRef: MatDialogRef<CategoriaFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.formLabel = this.data?.id ? 'Editar' : 'Novo';
    this.form = this.fb.group({
      id: [this.data?.id || null],
      descricao: [this.data?.descricao || '', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      cor: [this.data?.cor || '', [Validators.required]]
    });
  }

  onClose() {
    this.dialogRef.close(undefined);
  }

  onConfirm() {
    if (this.form.valid) {
      this.submitted = true;
      this.service.save(this.form.value).subscribe({
        next: () => this.dialogRef.close(this.form.value),
        error: error => this.erros = error.error?.errors
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  trackByFn(index: number, item: any): any {
    return index;
  }
}
