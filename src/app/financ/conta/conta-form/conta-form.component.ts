import { Component, OnInit, ErrorHandler } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ContaService } from '../conta.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-conta-form',
  templateUrl: './conta-form.component.html'
})
export class ContaFormComponent implements OnInit {

  form: UntypedFormGroup;
  submitted = false;
  idRegistro: number;
  erros = null;
  formLabel: string;

  constructor(
    private fb: UntypedFormBuilder,
    private service: ContaService,        
    private route: ActivatedRoute,
    private router: Router,
    private ns: NotificationService,
    private location: Location
  ) { }

  ngOnInit() {
    const conta = this.route.snapshot.data['conta'];
    this.formLabel = conta.id == 0 ? 'Novo' : 'Editar'
    
    this.form = this.fb.group({
      id: [conta.id],
      descricao: [conta.descricao, [Validators.required, Validators.minLength(3), Validators.maxLength(80)]]      
    });
  }

  onSubmit() {    
    this.submitted = true;    
    if (this.form.valid) {      
      let msgSuccess = 'Criado com sucesso';      
      this.idRegistro = this.form.value.id;
      if (this.idRegistro){
        msgSuccess = 'Alterado com sucesso';
      }      
      this.service.save(this.form.value).subscribe(
        success => {
          this.ns.notify(msgSuccess)          
          if(this.idRegistro){
            this.router.navigate(['/financ/conta/detalhe', this.idRegistro]);
          }
          else{
            this.router.navigate(['/financ/conta']);
          }                              
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
  onCancel() {    
    this.submitted = false;
    this.form.reset();        
    this.location.back();

  }

}
