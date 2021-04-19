import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrarComponent } from './perfil/registrar/registrar.component';
import { SecurityRoutingModule } from './security-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { PerfilFormComponent } from './perfil/perfil-form/perfil-form.component';
import { PerfilDetalheComponent } from './perfil/perfil-detalhe/perfil-detalhe.component';
import { PerfilService } from './perfil/perfil.service';
import { AlteraSenhaComponent } from './perfil/altera-senha/altera-senha.component';
import { EsqueceuSenhaComponent } from './perfil/esqueceu-senha/esqueceu-senha.component';
import { ResetaSenhaComponent } from './perfil/reseta-senha/reseta-senha.component';

@NgModule({
  declarations: [LoginComponent, RegistrarComponent, PerfilFormComponent, PerfilDetalheComponent, AlteraSenhaComponent, EsqueceuSenhaComponent, ResetaSenhaComponent],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [PerfilService]
})
export class SecurityModule { }
