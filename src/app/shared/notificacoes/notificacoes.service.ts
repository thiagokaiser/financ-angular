import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CrudService } from '../crud.service';
import { Notificacao } from './notificacao.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class NotificacoesService extends CrudService<Notificacao> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}notificacoes`);
  }

  countNaoLidas() {
    return this.http.get<number>(`${environment.API}notificacoes/nao-lidas/count`);
  }

  marcarComoLida(id: number) {
    return this.http.patch(`${environment.API}notificacoes/${id}/lido`, null);
  }
}
