import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface MonthFilterData {
  dtInicial?: string;
  dtFinal?: string;
}

@Component({
  selector: 'app-month-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './month-filter.component.html'
})
export class MonthFilterComponent implements OnInit {

  form: UntypedFormGroup;
  submitted = false;

  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<MonthFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MonthFilterData
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      dtInicial: [this.data?.dtInicial || '', [Validators.required]],
      dtFinal: [this.data?.dtFinal || '', [Validators.required]]
    });
  }

  onClose() {
    this.dialogRef.close();
  }

  onConfirm() {
    if (this.form.valid) {
      this.submitted = true;
      this.dialogRef.close(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }

  trackByFn(index: number, item: any): any {
    return index;
  }
}
