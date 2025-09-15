import { Component, OnInit, Inject } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export interface DateFilterData {
  dtInicial?: string;
  dtFinal?: string;
}

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './date-filter.component.html'
})
export class DateFilterComponent implements OnInit {

  form: UntypedFormGroup;
  submitted = false;

  constructor(
    private fb: UntypedFormBuilder,
    public dialogRef: MatDialogRef<DateFilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DateFilterData
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      dtInicial: [this.data?.dtInicial || '', [Validators.required]],
      dtFinal: [this.data?.dtFinal || '', [Validators.required]]
    });
  }

  onClose() {
    this.dialogRef.close(undefined);
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
