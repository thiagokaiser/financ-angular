import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DespesaService } from '../despesa.service';
import { Despesa } from '../despesa';
import { CategoriaDetalheComponent } from '../../categoria/categoria-detalhe/categoria-detalhe.component';

@Injectable({
  providedIn: 'root'
})
export class DespesaResolverGuard implements Resolve<Despesa> {

  constructor(
    private service: DespesaService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Despesa> {
    if (route.params && route.params['id']){        
      return this.service.loadByID(route.params['id']);
    }

    return of({
      id: 0,
      categoria: null,
      categoriaId: null,
      conta: null,
      contaId: null,
      descricao: null,
      valor: 0,
      dtVencimento: new Date(), 
      pago: false,
      dtPagamento: null,
      numParcelas: 0, 
      parcelaAtual: 0,
      idParcela: 0
    });
  }  
}