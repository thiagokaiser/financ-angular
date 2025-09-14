import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ContaService } from '../conta.service';
import { Conta } from '../conta';

@Injectable({
  providedIn: 'root'
})
export class ContaResolverGuard  {

  constructor(
    private service: ContaService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Conta> {
    if (route.params && route.params['id']){        
      return this.service.loadByID(route.params['id']);
    }

    return of({
      id: 0,
      descricao: null,
      cor: null,
      usuario_id: 0      
    });
  }  
}
