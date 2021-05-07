import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { UsuarioService } from '../usuario.service';
import { take, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/messages/notification.service';

@Component({
  selector: 'app-usuario-detalhe',
  templateUrl: './usuario-detalhe.component.html'
})
export class UsuarioDetalheComponent implements OnInit {

  usuario: Usuario;   

  constructor(    
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertModalService,
    private service: UsuarioService,
    private ns: NotificationService) {                
      route.params.subscribe(val => {        
        this.onRefresh();
      });
    }

  ngOnInit() {        
  }

  onEdit(id) {    
    this.router.navigate(['/admin/usuario/editar', id]);    
  }

  onCancel(){
    this.router.navigate(['/admin/usuario']);
  }

  onRefresh(){    
    let categ = this.route.snapshot.data['usuario'];           
    this.usuario = categ;    
  }    

  onDelete(usuario: Usuario) {
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja eliminar o usuario?');
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.service.remove(usuario.id) : EMPTY)
    ).subscribe(
      success => {
        this.ns.notify('Usuario eliminado com sucesso.')
        this.router.navigate(['/admin/usuario'])
      }
    );
  }
    
}
