import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { LoginService } from '../../login/login.service';
import { PerfilService } from '../perfil.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/messages/notification.service';

@Component({
  selector: 'app-perfil-detalhe',
  templateUrl: './perfil-detalhe.component.html',
  styleUrls: ['./perfil-detalhe.component.css']
})
export class PerfilDetalheComponent implements OnInit {
    
  user$: Observable<User>

  constructor(
    private loginService: LoginService,
    private perfilService: PerfilService,
    private router: Router,
    private ns: NotificationService
    ) { }

  ngOnInit() {  
    this.carregaPerfil();        
  }  

  onEdit(){
    this.router.navigate(['security/perfil/editar'])
  }

  onChangePass(){
    this.router.navigate(['security/forgot/' + this.loginService.user.email])
  }

  onChangeImg(){
    this.router.navigate(['security/perfil/imagem'])
  }

  carregaPerfil(){        
    this.user$ = this.perfilService.loadPerfil(this.loginService.user.email)    
  }

  carregaImagem(){
    return this.loginService.user.imagePath;
  }
}
