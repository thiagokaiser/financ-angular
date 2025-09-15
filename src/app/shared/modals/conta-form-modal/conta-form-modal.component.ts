import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContaService } from '../../../financ/conta/conta.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-conta-form-modal',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './conta-form-modal.component.html'
})
export class ContaFormModalComponent implements OnInit {

  form: UntypedFormGroup;
  submitted = false;
  erros: any = null;
  formLabel: string;

  constructor(
    private fb: UntypedFormBuilder,
    private service: ContaService,
    public dialogRef: MatDialogRef<ContaFormModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.formLabel = this.data?.id ? 'Editar' : 'Novo';

    this.form = this.fb.group({
      id: [this.data?.id || null],
      descricao: [this.data?.descricao || '', [Validators.required, Validators.minLength(3), Validators.maxLength(60)]]
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.form.valid) {
      this.submitted = true;
      this.service.save(this.form.value).subscribe(
        success => this.dialogRef.close(this.form.value),
        error => this.erros = error.error?.errors
      );
    } else {
      this.form.markAllAsTouched();
    }
  }

  trackByFn(index: number, item: any): any {
    return index;
  }
}
