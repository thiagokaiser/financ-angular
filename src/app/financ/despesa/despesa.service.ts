import { Injectable } from '@angular/core';
import { Despesa, ListDespesa } from './despesa';
import { CrudService } from 'src/app/shared/crud.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { take, tap } from 'rxjs/operators';

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

  removeByIdentificador(identificador) {    
    return this.http.delete(`${environment.API}despesas/identificador/${identificador}`).pipe(take(1));                   
  }  

  updateAll(despesa: Despesa) {
    return this.http.put(`${environment.API}despesas/all/${despesa.identificador}`, despesa).pipe(take(1));
  }

  updateUnpaid(despesa: Despesa) {
    return this.http.put(`${environment.API}despesas/unpaid/${despesa.identificador}`, despesa).pipe(take(1));
  }
}