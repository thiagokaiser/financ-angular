import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-date-filter',
  templateUrl: './date-filter.component.html'
})
export class DateFilterComponent implements OnInit {

  form: FormGroup;

  confirmResult: Subject<any>;

  constructor(
    public bsModalRef: BsModalRef,
    private fb: FormBuilder,
    ) { }

  ngOnInit() {    
    this.confirmResult = new Subject();
    this.form = this.fb.group({      
      dtInicial: ['', [Validators.required]], 
      dtFinal: ['', [Validators.required]]      
    });    
  }

  onClose(){    
    this.bsModalRef.hide();
  }
  onConfirm(){    
    if (this.form.valid) {      
      this.onConfirmAndClose(this.form.value);    
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
