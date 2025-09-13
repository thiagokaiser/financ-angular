import { Component, OnInit } from '@angular/core';
import { Usuario } from '../usuario';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { UsuarioService } from '../usuario.service';
import { take, switchMap } from 'rxjs/operators';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { Perfil } from '../perfil';

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
    this.usuario = this.route.snapshot.data['usuario'];
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

  onDeleteData(usuario: Usuario) {
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja eliminar os dados do usuario?');
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.service.removeData(usuario.id) : EMPTY)
    ).subscribe(
      success => {
        this.ns.notify('Dados do usuario eliminados com sucesso.')
        this.router.navigate(['/admin/usuario'])
      }
    );
  }

  onDeletePerfil(usuarioId, perfil) {
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja eliminar o perfil ' + perfil + ' ?');
    result$.asObservable().pipe(
      take(1),
      switchMap(result => result ? this.service.removePerfil(usuarioId, perfil) : EMPTY)
    ).subscribe(
      success => {
        this.ns.notify('Perfil eliminado com sucesso.')
        this.reloadUsuario(usuarioId)
      }
    );
  }

  onAddPerfil(usuarioId){
    const result2$ = this.alertService.modalAddPerfil(usuarioId)
    result2$.asObservable().pipe(take(1)).subscribe(
      success => {
        this.ns.notify('Perfil adicionado com sucesso.')
        this.reloadUsuario(usuarioId)
      }
    );
  }

  reloadUsuario(usuarioId){
    this.router.navigate(['/admin/usuario/detalhe', usuarioId]).then(async () => {
      this.usuario = await this.service.loadByID(usuarioId).toPromise();
    })
  }
}
