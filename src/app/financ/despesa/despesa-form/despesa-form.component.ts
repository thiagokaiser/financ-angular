import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DespesaService } from '../despesa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Categoria } from '../../categoria/categoria';
import { Conta } from '../../conta/conta';
import { CategoriaService } from '../../categoria/categoria.service';
import { ContaService } from '../../conta/conta.service';

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
  categorias$: Observable<Categoria[]>;
  contas$: Observable<Conta[]>;
  operacao: string;

  constructor(
    private fb: FormBuilder,
    private service: DespesaService,        
    private categService: CategoriaService,
    private contaService: ContaService,
    private route: ActivatedRoute,
    private router: Router,
    private ns: NotificationService,
    private location: Location
  ) { }

  ngOnInit() {
    const despesa = this.route.snapshot.data['despesa'];
    this.operacao = this.route.snapshot.params['operacao'];
    this.idRegistro = despesa.id;
    this.formLabel = despesa.id == 0 ? 'Novo' : 'Edita';    
    console.log(despesa);
    this.form = this.fb.group({
      id: [despesa.id],
      identificador: [despesa.identificador],
      descricao: [despesa.descricao, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],      
      categoriaId: [ despesa.categoria != null ? despesa.categoria.id : null, [Validators.required]],
      contaId:  [ despesa.conta != null ? despesa.conta.id : null],      
      valor:  [despesa.valor, [Validators.required]],
      dtVencimento: [new Date(despesa.dtVencimento).toISOString().substring(0,10), [Validators.required]], 
      pago: [despesa.pago],
      numParcelas: [despesa.numParcelas],
      parcelaAtual: [{ value: despesa.parcelaAtual, disabled: true}]      
    });

    if(this.idRegistro != 0){
      this.form.controls['numParcelas'].disable();
    }

    if(this.operacao == 'all'){
      this.formLabel = 'Editando todas parcelas';
      this.form.controls['valor'].disable();
      this.form.controls['dtVencimento'].disable();
      this.form.controls['pago'].disable();      
      this.form.controls['contaId'].disable();      
    }else if(this.operacao == 'unpaid'){
      this.formLabel = 'Editando todas parcelas não pagas';
      this.form.controls['dtVencimento'].disable();      
      this.form.controls['pago'].disable();      
    }

    this.form.get('pago').valueChanges.subscribe(val => {
      if (this.form.get('pago').value == true) {
        this.form.controls['contaId'].setValidators([Validators.required]);
        this.form.controls['contaId'].updateValueAndValidity();
      } else {
        this.form.controls['contaId'].clearValidators();
        this.form.controls['contaId'].updateValueAndValidity();
      }
    });
    
    this.categorias$ = this.categService.list();
    this.contas$ = this.contaService.list();
  }

  onSubmit() {
    this.submitted = true;    
    if (this.form.valid) {      
      let msgSuccess = 'Criado com sucesso';      
      this.idRegistro = this.form.value.id;
      if (this.idRegistro){
        msgSuccess = 'Alterado com sucesso';
      }      
      if(this.operacao == 'all'){
        this.service.updateAll(this.form.value).subscribe(
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
      }else if(this.operacao == 'unpaid'){
        this.service.updateUnpaid(this.form.value).subscribe(
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
      }else{        
        this.service.save(this.form.value).subscribe(
          success => {              
              this.ns.notify(msgSuccess)          
              if(this.idRegistro){
              this.router.navigate(['/financ/despesa/detalhe', this.idRegistro]);
            }else{
              this.router.navigate(['/financ/despesa']);
            }                              
          },
          error => {          
            this.erros = error.error.errors;
            throw error          
          }
        );              
      }
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