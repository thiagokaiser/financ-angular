import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
import { LoginService } from '../../login/login.service';
import { PerfilService } from '../perfil.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/shared/messages/notification.service';
import { base64ToFile, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
    selector: 'app-perfil-imagem',
    templateUrl: './perfil-imagem.component.html',
    styleUrls: ['./perfil-imagem.component.css'],
    standalone: false
})
export class PerfilImagemComponent implements OnInit {  
  
  user$: Observable<User>
  imageChangedEvent: any = '';  
  croppedImage = this.loginService.user.imagemPerfil;
  croppedImageBlob: Blob | null = null;
  imageLoadedFlag = false;

  constructor(
    private loginService: LoginService,
    private perfilService: PerfilService,
    private router: Router,
    private ns: NotificationService    
    ) { }

  ngOnInit() {  
    this.carregaPerfil();    
  }    

  onSubmit() {
    if (!this.croppedImageBlob) {
      this.ns.notify('Imagem nao alterada');
      this.router.navigate(['security/perfil/']);
    } else {
      const formData = new FormData();      
      formData.append('file', this.croppedImageBlob, 'perfil.png');

      this.perfilService.uploadImagem(formData).subscribe(
        success => {
          this.ns.notify('Imagem atualizada com sucesso.');
          this.loginService.updateImagePath(success.imagemPerfil);
          this.router.navigate(['security/perfil/']);
        },
        error => {
          this.ns.notify('Erro ao atualizar a imagem.');
        }
      );
    }
  }

  onCancel(){
    this.router.navigate(['security/perfil/'])
  }  

  carregaPerfil(){        
    this.user$ = this.perfilService.loadPerfil(this.loginService.user.email)
    this.user$.subscribe(
      success =>{
        this.croppedImage = this.loginService.user.imagemPerfil
      }
    )
  }  

  fileChangeEvent(event: any): void {
    this.imageLoadedFlag = true;
    this.imageChangedEvent = event;      
  }

  imageCropped(event: ImageCroppedEvent) {
    if (event.blob) {
      this.croppedImageBlob = event.blob;
    }
  }

  imageLoaded() {
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }  
}
