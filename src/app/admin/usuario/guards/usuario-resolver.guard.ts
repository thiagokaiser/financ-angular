import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UsuarioService } from '../usuario.service';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioResolverGuard  {

  constructor(
    private service: UsuarioService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario> {
    if (route.params && route.params['id']){        
      return this.service.loadByID(route.params['id']);
    }

    return of({
      id: 0,
      nome: '',
      sobrenome: '',
      dtNascimento: null,
      cidade: '',
      estado: '',
      descricao: '',
      imagemPerfil: '',
      email: ''
    });
  }  
}
