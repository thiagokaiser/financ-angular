import { Component, OnInit } from '@angular/core';
import { Despesa } from '../despesa';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { DespesaService } from '../despesa.service';
import { take, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/messages/notification.service';

@Component({
  selector: 'app-despesa-detalhe',
  templateUrl: './despesa-detalhe.component.html'
})
export class DespesaDetalheComponent implements OnInit {

  despesa: Despesa;   

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertModalService,
    private service: DespesaService,
    private ns: NotificationService) {                
      route.params.subscribe(val => {        
        this.onRefresh();
      });
    }

  ngOnInit() {        
  }

  onEdit(id) {    
    this.router.navigate(['/financ/despesa/editar', id]);    
  }
  onCancel(){
    this.router.navigate(['/financ/despesa']);
  }
  onRefresh(){    
    let categ = this.route.snapshot.data['despesa'];           
    this.despesa = categ;    
  }  

  onNew(){
    this.router.navigate(['/financ/despesa/novo']);    
  }

  onDelete(despesa: Despesa) {
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja eliminar o despesa?');
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.service.remove(despesa.id) : EMPTY)
    ).subscribe(
      success => {
        this.ns.notify('Despesa eliminado com sucesso.')
        this.router.navigate(['/financ/despesa'])
      }
    );
  }
    
}
