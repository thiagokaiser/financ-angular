import { Injectable } from '@angular/core';
import { Categoria, ListCategoria } from './categoria';
import { CrudService } from 'src/app/shared/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends CrudService<Categoria>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}categorias`);
  }

  listPage(pager) {    
    return this.http.get<ListCategoria>(`${environment.API}categorias/page`, {params: pager});                   
  }  
}