import { Injectable } from '@angular/core';
import { Conta, ListConta } from './conta';
import { CrudService } from 'src/app/shared/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContaService extends CrudService<Conta>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}contas`);
  }

  listPage(pager) {    
    return this.http.get<ListConta>(`${environment.API}contas/page`, {params: pager});                   
  }  
}