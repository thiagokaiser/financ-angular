import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { UsuarioDetalheComponent } from './usuario/usuario-detalhe/usuario-detalhe.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioListaComponent } from './usuario/usuario-lista/usuario-lista.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    UsuarioDetalheComponent, UsuarioFormComponent, UsuarioListaComponent
  ],
  imports: [
    CommonModule,    
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MatSortModule,    
    AdminRoutingModule
  ]
})
export class AdminModule { }
