import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificacoesService } from 'src/app/shared/notificacoes/notificacoes.service';
import { Notificacao } from 'src/app/shared/notificacoes/notificacao.model';

@Component({
  selector: 'app-notificacoes-painel',
  templateUrl: './notificacoes-painel.component.html',
  styleUrls: ['./notificacoes-painel.component.css'],
  standalone: false
})
export class NotificacoesPainelComponent implements OnInit, OnDestroy {

  notificacoes: Notificacao[] = [];
  countNaoLidas = 0;
  private pollingInterval: any;

  constructor(private notificacoesService: NotificacoesService) {}

  ngOnInit() {
    this.atualizarContagem();
    this.pollingInterval = setInterval(() => this.atualizarContagem(), 60000);
  }

  ngOnDestroy() {
    clearInterval(this.pollingInterval);
  }

  atualizarContagem() {
    this.notificacoesService.countNaoLidas().subscribe(count => {
      this.countNaoLidas = count;
    });
  }

  carregarNotificacoes() {
    this.notificacoesService.list().subscribe(lista => {
      this.notificacoes = lista;
    });
  }

  marcarComoLida(notificacao: Notificacao) {
    if (notificacao.lido) return;
    this.notificacoesService.marcarComoLida(notificacao.id).subscribe(() => {
      notificacao.lido = true;
      notificacao.dtLeitura = new Date().toISOString();
      this.countNaoLidas = Math.max(0, this.countNaoLidas - 1);
    });
  }

  remover(notificacao: Notificacao, event: Event) {
    event.stopPropagation();
    this.notificacoesService.remove(notificacao.id).subscribe(() => {
      this.notificacoes = this.notificacoes.filter(n => n.id !== notificacao.id);
      if (!notificacao.lido) {
        this.countNaoLidas = Math.max(0, this.countNaoLidas - 1);
      }
    });
  }
}
