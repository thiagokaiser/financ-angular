import { Injectable } from '@angular/core';
import { Despesa, ListDespesa } from './despesa';
import { CrudService } from 'src/app/shared/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DespesaService extends CrudService<Despesa>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}despesas`);
  }

  listPage(pager) {    
    return this.http.get<ListDespesa>(`${environment.API}despesas/page`, {params: pager});                   
  }  
}