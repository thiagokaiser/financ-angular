import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { DespesaService } from '../despesa.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { Categoria } from '../../categoria/categoria';
import { Conta } from '../../conta/conta';
import { CategoriaService } from '../../categoria/categoria.service';
import { ContaService } from '../../conta/conta.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CategoriaFormModalComponent } from '../../../shared/modals/categoria-form-modal/categoria-form-modal.component';
import { take } from 'rxjs/operators';
import { ContaFormModalComponent } from 'src/app/shared/modals/conta-form-modal/conta-form-modal.component';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
  selector: 'app-despesa-form',
  templateUrl: './despesa-form.component.html'
})
export class DespesaFormComponent implements OnInit {

  form: UntypedFormGroup;
  submitted = false;
  idRegistro: number;
  erros = null;
  formLabel: string;
  categorias$: Observable<Categoria[]>;
  contas$: Observable<Conta[]>;
  operacao: string;
  msgSuccess: string;

  constructor(
    private fb: UntypedFormBuilder,
    private service: DespesaService,
    private categService: CategoriaService,
    private contaService: ContaService,
    private route: ActivatedRoute,
    private router: Router,
    private ns: NotificationService,
    private location: Location,
    private alertService: AlertModalService
  ) { }

  ngOnInit() {
    const despesa = this.route.snapshot.data['despesa'];
    this.operacao = this.route.snapshot.params['operacao'];
    this.idRegistro = despesa.id;
    this.formLabel = despesa.id == 0 ? 'Nova' : 'Editar';

    this.form = this.fb.group({
      id: [despesa.id],
      idParcela: [despesa.idParcela],
      descricao: [despesa.descricao, [Validators.required, Validators.minLength(3), Validators.maxLength(60)]],
      categoriaId: [ despesa.categoria != null ? despesa.categoria.id : null, [Validators.required]],
      contaId:  [ despesa.conta != null ? despesa.conta.id : null],
      valor:  [despesa.valor, [Validators.required]],
      dtVencimento: [new Date(despesa.dtVencimento).toISOString().substring(0,10), [Validators.required]],
      pago: [despesa.pago],
      dtPagamento: [despesa.dtPagamento ? new Date(despesa.dtPagamento).toISOString().substring(0,10) : null],
      numParcelas: [despesa.numParcelas],
      parcelaAtual: [{ value: despesa.parcelaAtual, disabled: true}]
    });

    if(this.idRegistro != 0){
      this.form.controls['numParcelas'].disable();
    }

    if(this.operacao == 'all'){
      this.formLabel = 'Editar todas parcelas';
      this.form.controls['valor'].disable();
      this.form.controls['dtVencimento'].disable();
      this.form.controls['pago'].disable();
      this.form.controls['dtPagamento'].disable();
      this.form.controls['contaId'].disable();
    }else if(this.operacao == 'unpaid'){
      this.formLabel = 'Editar todas parcelas não pagas';
      this.form.controls['pago'].disable();
      this.form.controls['dtPagamento'].disable();
    }

    this.form.get('pago').valueChanges.subscribe(val => {
      if (val === true) {
        this.form.controls['contaId'].setValidators([Validators.required]);
        this.form.controls['contaId'].updateValueAndValidity();
        if (!this.form.get('dtPagamento').value) {
          const hoje = new Date().toISOString().substring(0,10);
          this.form.get('dtPagamento').setValue(hoje);
        }
        this.form.get('dtPagamento').enable();
      } else {
        this.form.controls['contaId'].clearValidators();
        this.form.controls['contaId'].updateValueAndValidity();
        this.form.get('dtPagamento').setValue(null);
        this.form.get('dtPagamento').disable();
      }
    });
    if (!this.form.get('pago').value) {
      this.form.get('dtPagamento').disable();
    }

    this.categorias$ = this.categService.list();
    this.contas$ = this.contaService.list();
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      this.msgSuccess = 'Criado com sucesso';
      this.idRegistro = this.form.value.id;
      if (this.idRegistro){
        this.msgSuccess = 'Alterado com sucesso';
      }
      if(this.operacao == 'all'){
        this.service.updateAll(this.form.value).subscribe(
          success => {
            this.submitSucess();
          },
          error => {
            this.erros = error.error.errors;
            throw error
          }
        );
      }else if(this.operacao == 'unpaid'){
        this.service.updateUnpaid(this.form.value).subscribe(
          success => {
            this.submitSucess();
          },
          error => {
            this.erros = error.error.errors;
            throw error
          }
        );
      }else{
        this.service.save(this.form.value).subscribe(
          success => {
            this.submitSucess();
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

  submitSucess(){
    this.ns.notify(this.msgSuccess)
    if(this.idRegistro){
      this.router.navigate(['/financ/despesa/detalhe', this.idRegistro]);
    }
    else{
      this.router.navigate(['/financ/despesa']);
    }
  }

  onNewCateg(){
    const result$ = this.alertService.modalNewCateg()
    result$.asObservable().pipe(take(1)).subscribe(
      success => {
        this.categorias$ = this.categService.list();
      }
    );
  }

  onNewConta(){
    const result2$ = this.alertService.modalNewConta()
    result2$.asObservable().pipe(take(1)).subscribe(
      success => {
        this.contas$ = this.contaService.list();
      }
    );
  }



}
