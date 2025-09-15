import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { CategoriaService } from '../categoria.service';
import { take, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/messages/notification.service';

@Component({
    selector: 'app-categoria-detalhe',
    templateUrl: './categoria-detalhe.component.html',
    standalone: false
})
export class CategoriaDetalheComponent implements OnInit {

  categoria: Categoria;   

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertModalService,
    private service: CategoriaService,
    private ns: NotificationService) {                
      route.params.subscribe(val => {        
        this.onRefresh();
      });
    }

  ngOnInit() {        
  }

  onEdit(id) {    
    this.router.navigate(['/financ/categoria/editar', id]);    
  }
  onCancel(){
    this.router.navigate(['/financ/categoria']);
  }
  onRefresh(){    
    let categ = this.route.snapshot.data['categoria'];           
    this.categoria = categ;    
  }  

  onNew(){
    this.router.navigate(['/financ/categoria/novo']);    
  }

  onDelete(categoria: Categoria) {
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja eliminar o categoria?');
    result$.pipe(
      take(1),
      switchMap(result => result ? this.service.remove(categoria.id) : EMPTY)
    ).subscribe(
      success => {
        this.ns.notify('Categoria eliminado com sucesso.')
        this.router.navigate(['/financ/categoria'])
      }
    );
  }
    
}
