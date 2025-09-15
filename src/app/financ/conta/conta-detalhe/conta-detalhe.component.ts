import { Component, OnInit } from '@angular/core';
import { Conta } from '../conta';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ContaService } from '../conta.service';
import { take, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/messages/notification.service';

@Component({
    selector: 'app-conta-detalhe',
    templateUrl: './conta-detalhe.component.html',
    standalone: false
})
export class ContaDetalheComponent implements OnInit {

  conta: Conta;   

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertModalService,
    private service: ContaService,
    private ns: NotificationService) {                
      route.params.subscribe(val => {        
        this.onRefresh();
      });
    }

  ngOnInit() {        
  }

  onEdit(id) {    
    this.router.navigate(['/financ/conta/editar', id]);    
  }
  onCancel(){
    this.router.navigate(['/financ/conta']);
  }
  onRefresh(){    
    let categ = this.route.snapshot.data['conta'];           
    this.conta = categ;    
  }  

  onNew(){
    this.router.navigate(['/financ/conta/novo']);    
  }

  onDelete(conta: Conta) {
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja eliminar o conta?');
    result$.pipe(
      take(1),
      switchMap(result => result ? this.service.remove(conta.id) : EMPTY)
    ).subscribe(
      success => {
        this.ns.notify('Conta eliminado com sucesso.')
        this.router.navigate(['/financ/conta'])
      }
    );
  }
    
}
