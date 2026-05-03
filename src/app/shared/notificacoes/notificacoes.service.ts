import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { CrudService } from '../crud.service';
import { Notificacao } from './notificacao.model';
import { SKIP_LOADING } from '../skip-loading.token';
import { environment } from 'src/environments/environment';

const silentContext = () => new HttpContext().set(SKIP_LOADING, true);

@Injectable({ providedIn: 'root' })
export class NotificacoesService extends CrudService<Notificacao> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}notificacoes`);
  }

  override list() {
    return this.http.get<Notificacao[]>(`${environment.API}notificacoes`, { context: silentContext() });
  }

  override remove(id: number) {
    return this.http.delete(`${environment.API}notificacoes/${id}`, { context: silentContext() }).pipe(take(1));
  }

  countNaoLidas() {
    return this.http.get<number>(`${environment.API}notificacoes/nao-lidas/count`, { context: silentContext() });
  }

  marcarComoLida(id: number) {
    return this.http.patch(`${environment.API}notificacoes/${id}/lido`, null, { context: silentContext() });
  }
}
