import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DespesaService } from '../despesa.service';
import { Despesa } from '../despesa';

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
      categoriaId: 0,
      contaId: 0,
      descricao: null,
      valor: 0,
      dtVencimento: null, 
      pago: false,
      numParcelas: 0, 
      parcelaAtual: 0,
      identificador: 0
    });
  }  
}
