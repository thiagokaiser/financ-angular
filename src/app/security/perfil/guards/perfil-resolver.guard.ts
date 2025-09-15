import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../../user';
import { PerfilService } from '../perfil.service';
import { LoginService } from '../../login/login.service';

@Injectable({
    providedIn: 'root'
})
export class PerfilResolverGuard  {

  constructor(
    private service: PerfilService,
    private loginService: LoginService
  ){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {    

    return this.service.loadPerfil(this.loginService.user.email)
    
  }  
}
