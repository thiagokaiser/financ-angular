import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuarioResolverGuard } from './usuario/guards/usuario-resolver.guard';
import { UsuarioDetalheComponent } from './usuario/usuario-detalhe/usuario-detalhe.component';
import { UsuarioFormComponent } from './usuario/usuario-form/usuario-form.component';
import { UsuarioListaComponent } from './usuario/usuario-lista/usuario-lista.component';


const routes: Routes = [
  { path: 'usuario', component: UsuarioListaComponent},  
  { path: 'usuario/detalhe/:id', component: UsuarioDetalheComponent, resolve: {usuario: UsuarioResolverGuard}},
  { path: 'usuario/editar/:id', component: UsuarioFormComponent, resolve: {usuario: UsuarioResolverGuard}},
  { path: 'usuario/novo', component: UsuarioFormComponent, resolve: {usuario: UsuarioResolverGuard}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
