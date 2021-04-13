import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { FinancRoutingModule } from './financ-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriaDetalheComponent } from './categoria/categoria-detalhe/categoria-detalhe.component';
import { CategoriaFormComponent } from './categoria/categoria-form/categoria-form.component';
import { CategoriaListaComponent } from './categoria/categoria-lista/categoria-lista.component';
import { ContaDetalheComponent } from './conta/conta-detalhe/conta-detalhe.component';
import { ContaFormComponent } from './conta/conta-form/conta-form.component';
import { ContaListaComponent } from './conta/conta-lista/conta-lista.component';
import { DespesaDetalheComponent } from './despesa/despesa-detalhe/despesa-detalhe.component';
import { DespesaFormComponent } from './despesa/despesa-form/despesa-form.component';
import { DespesaListaComponent } from './despesa/despesa-lista/despesa-lista.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    HomeComponent,
    CategoriaDetalheComponent,CategoriaFormComponent, CategoriaListaComponent,
    ContaDetalheComponent, ContaFormComponent, ContaListaComponent,
    DespesaDetalheComponent, DespesaFormComponent, DespesaListaComponent
  ],
  imports: [
    CommonModule,
    FinancRoutingModule,    
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    MatSortModule
  ],
  exports:[
    HomeComponent
  ],
  providers: []
})
export class FinancModule { }
