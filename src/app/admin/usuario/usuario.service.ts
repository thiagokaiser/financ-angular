import { Injectable } from '@angular/core';
import { CrudService } from 'src/app/shared/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario, ListUsuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends CrudService<Usuario>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}admin`);
  }

  listPage(pager) {    
    return this.http.get<ListUsuario>(`${environment.API}admin/page`, {params: pager});                   
  }  
}