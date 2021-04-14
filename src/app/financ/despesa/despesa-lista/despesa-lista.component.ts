import { Component, OnInit, ViewChild } from '@angular/core';
import { Despesa, ListDespesa } from '../despesa';
import { Observable, Subject, EMPTY } from 'rxjs';
import { DespesaService } from '../despesa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { PaginationInstance } from 'ngx-pagination';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-despesa-lista',
  templateUrl: './despesa-lista.component.html'
})
export class DespesaListaComponent implements OnInit { 
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  despesas$: Observable<ListDespesa>;  
  searchtext: string = "";  
  orderby: string = "id";
  direction: string = "asc";

  public config: PaginationInstance = {
      id: 'advanced',
      itemsPerPage: 5,
      currentPage: 1,
      totalItems: 100
  };

  constructor(
    private service: DespesaService,
    private router: Router,
    private route: ActivatedRoute    
  ) { }
    
  ngOnInit() {
    this.onRefresh();
  }
  
  onDetalhe(id){
    this.router.navigate(['detalhe', id], { relativeTo: this.route });    
  }

  onPageChange(pagina : number){    
    this.config.currentPage = pagina;    
    this.onRefresh();    
  }

  onPageSize(pagesize: number){    
    this.config.itemsPerPage = pagesize;    
    this.onPageChange(1);
  }

  onSearch(search: string){    
    this.searchtext = search;    
    this.onPageChange(1);
  }

  sortData(sort: Sort){
    this.orderby = `${sort.active}`;
    this.direction = `${sort.direction}`;

    if(this.orderby == "valorxs"){
      this.orderby = "valor";
    }
    
    this.onRefresh();
  }  

  onRefresh(){    
    let params = {linesPerPage : this.config.itemsPerPage, page: this.config.currentPage - 1, orderBy: this.orderby, direction : this.direction.toUpperCase(), search: this.searchtext};
    
    this.despesas$ = this.service.listPage(params).pipe(
      tap(x => {
        this.config.totalItems = x['totalElements']        
      })
    )    
    
  }  


  
}
