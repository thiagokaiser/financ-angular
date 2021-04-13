import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DespesaService } from '../despesa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-despesa-form',
  templateUrl: './despesa-form.component.html'
})
export class DespesaFormComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  idRegistro: number;
  erros = null;
  formLabel: string;

  constructor(
    private fb: FormBuilder,
    private service: DespesaService,        
    private route: ActivatedRoute,
    private router: Router,
    private ns: NotificationService,
    private location: Location
  ) { }

  ngOnInit() {
    const despesa = this.route.snapshot.data['despesa'];
    this.formLabel = despesa.id == 0 ? 'Novo' : 'Edita'
    
    this.form = this.fb.group({
      id: [despesa.id],
      descricao: [despesa.descricao, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],      
      categoriaId: [despesa.categoriaId, [Validators.required]],
      contaId:  [despesa.contaId, [Validators.required]],      
      valor:  [despesa.valor, [Validators.required]],
      dtVencimento: [despesa.dtVencimento, [Validators.required]], 
      pago: [despesa.pago],
      numParcelas: [despesa.numParcelas],
      parcelaAtual: [despesa.parcelaAtual]      
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
            this.router.navigate(['/financ/despesa/detalhe', this.idRegistro]);
          }
          else{
            this.router.navigate(['/financ/despesa']);
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
