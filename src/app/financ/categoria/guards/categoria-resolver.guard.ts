import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CategoriaService } from '../categoria.service';
import { Categoria } from '../categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaResolverGuard  {

  constructor(
    private service: CategoriaService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Categoria> {
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
