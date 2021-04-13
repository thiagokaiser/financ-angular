import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoriaListaComponent } from './categoria/categoria-lista/categoria-lista.component';
import { CategoriaDetalheComponent } from './categoria/categoria-detalhe/categoria-detalhe.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { CategoriaResolverGuard } from './categoria/guards/categoria-resolver.guard';
import { ContaDetalheComponent } from './conta/conta-detalhe/conta-detalhe.component';
import { ContaFormComponent } from './conta/conta-form/conta-form.component';
import { ContaListaComponent } from './conta/conta-lista/conta-lista.component';
import { ContaResolverGuard } from './conta/guards/conta-resolver.guard';
import { DespesaDetalheComponent } from './despesa/despesa-detalhe/despesa-detalhe.component';
import { DespesaFormComponent } from './despesa/despesa-form/despesa-form.component';
import { DespesaListaComponent } from './despesa/despesa-lista/despesa-lista.component';
import { DespesaResolverGuard } from './despesa/guards/despesa-resolver.guard';

const routes: Routes = [
  {
    path: 'home', component: HomeComponent
  },    
  { path: 'categoria', component: CategoriaListaComponent},
  { path: 'categoria/detalhe/:id', component: CategoriaDetalheComponent, resolve: {categoria: CategoriaResolverGuard}},
  { path: 'categoria/editar/:id', component: CategoriaFormComponent, resolve: {categoria: CategoriaResolverGuard}},
  { path: 'categoria/novo', component: CategoriaFormComponent, resolve: {categoria: CategoriaResolverGuard}},
  { path: 'conta', component: ContaListaComponent},
  { path: 'conta/detalhe/:id', component: ContaDetalheComponent, resolve: {conta: ContaResolverGuard}},
  { path: 'conta/editar/:id', component: ContaFormComponent, resolve: {conta: ContaResolverGuard}},
  { path: 'conta/novo', component: ContaFormComponent, resolve: {conta: ContaResolverGuard}},
  { path: 'despesa', component: DespesaListaComponent},
  { path: 'despesa/detalhe/:id', component: DespesaDetalheComponent, resolve: {despesa: DespesaResolverGuard}},
  { path: 'despesa/editar/:id', component: DespesaFormComponent, resolve: {despesa: DespesaResolverGuard}},
  { path: 'despesa/novo', component: DespesaFormComponent, resolve: {despesa: DespesaResolverGuard}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinancRoutingModule { }
