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
  styleUrls: ['./perfil-imagem.component.css']
})
export class PerfilImagemComponent implements OnInit {  
  
  user$: Observable<User>
  imageChangedEvent: any = '';  
  croppedImage = this.loginService.user.imagePath;

  constructor(
    private loginService: LoginService,
    private perfilService: PerfilService,
    private router: Router,
    private ns: NotificationService    
    ) { }

  ngOnInit() {  
    this.carregaPerfil();    
  }    

  onSubmit(){
    if(this.croppedImage == this.loginService.user.imagePath){
      this.ns.notify('Imagem nao alterada')
      this.router.navigate(['security/perfil/'])        
    }else{
      let file = base64ToFile(this.croppedImage)
      const formData = new FormData();
      formData.append('file', file);

      this.perfilService.uploadImagem(formData).subscribe(
        success => {
          this.ns.notify('Imagem atualizada com sucesso.')
          this.loginService.checkImagePath()
          this.router.navigate(['security/perfil/'])        
        }
      )  
    }    
  }

  onCancel(){
    this.router.navigate(['security/perfil/'])
  }  

  carregaPerfil(){        
    this.user$ = this.perfilService.loadPerfil(this.loginService.user.email)    
  }  

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;      
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded(image: HTMLImageElement) {
    // show cropper
  }

  cropperReady() {
    // cropper ready
  }

  loadImageFailed() {
    // show message
  }  
}
