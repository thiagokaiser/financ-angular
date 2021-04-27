import { Component, OnInit, ViewChild } from '@angular/core';
import { Conta, ListConta } from '../conta';
import { Observable, Subject, EMPTY } from 'rxjs';
import { ContaService } from '../conta.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { PaginationInstance } from 'ngx-pagination';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-conta-lista',
  templateUrl: './conta-lista.component.html'
})
export class ContaListaComponent implements OnInit { 
  
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  contas$: Observable<ListConta>;  
  searchtext: string = "";  
  orderby: string = "descricao";
  direction: string = "asc";

  public config: PaginationInstance = {
      id: 'advanced',
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 100
  };

  constructor(
    private service: ContaService,
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
    this.onRefresh();
  }  

  onRefresh(){    
    let params = {linesPerPage : this.config.itemsPerPage, page: this.config.currentPage - 1, orderBy: this.orderby, direction : this.direction.toUpperCase(), search: this.searchtext};
    
    this.contas$ = this.service.listPage(params).pipe(
      tap(x => {
        this.config.totalItems = x['totalElements']        
      })
    )    
    
  }  


  
}
