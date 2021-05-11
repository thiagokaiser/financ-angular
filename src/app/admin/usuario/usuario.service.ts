import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario, ListUsuario } from './usuario';
import { take } from 'rxjs/operators';
import { User } from 'src/app/security/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}usuarios`);
  }

  listPage(pager) {        
    return this.http.get<ListUsuario>(`${environment.API}usuarios/page`, {params: pager});                   
  }  

  updateAdmin(usuario: User) {
    return this.http.put(`${environment.API}usuarios/admin/${usuario.id}`, usuario).pipe(take(1));
  }

}