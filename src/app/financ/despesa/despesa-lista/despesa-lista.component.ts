import { Component, OnInit, ViewChild } from '@angular/core';
import { ListDespesa } from '../despesa';
import { Observable } from 'rxjs';
import { DespesaService } from '../despesa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { PaginationInstance } from 'ngx-pagination';
import { take, tap, filter } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';

@Component({
    selector: 'app-despesa-lista',
    templateUrl: './despesa-lista.component.html',
    standalone: false
})
export class DespesaListaComponent implements OnInit { 
  
  @ViewChild(MatSort) sort: MatSort;

  despesas$: Observable<ListDespesa>;  
  searchtext: string = "";  
  orderBy: string = "dtVencimento";
  direction: string = "asc";
  result: any;
  dtInicial: string = "";
  dtFinal: string = "";  
  total = 0.0;
  totalPago = 0.0;
  totalPendente = 0.0;

  public config: PaginationInstance = {
      id: 'advanced',
      itemsPerPage: 10,
      currentPage: 1,
      totalItems: 100
  };

  constructor(
    private service: DespesaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService    
  ) { }
    
  ngOnInit() {
    let params = JSON.parse(sessionStorage.getItem("despesaParams"))
    if(params != null){
      this.searchtext = params.search
      this.orderBy = params.orderBy
      this.direction = params.direction
      this.dtInicial = params.dtInicial
      this.dtFinal = params.dtFinal
      this.config.currentPage = params.page + 1
      this.config.itemsPerPage = params.linesPerPage
    }else{
      this.updateDates(new Date().toISOString(), 0)
    }        
    
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
    this.orderBy = `${sort.active}`;
    this.direction = `${sort.direction}`;

    if(this.orderBy == "valorxs"){
      this.orderBy = "valor";
    }
    
    this.onRefresh();
  }  

  onRefresh(){           
    let params = {
      linesPerPage : this.config.itemsPerPage, 
      page: this.config.currentPage - 1, 
      orderBy: this.orderBy, 
      direction : this.direction.toUpperCase(), 
      search: this.searchtext,
      dtInicial: this.dtInicial,
      dtFinal: this.dtFinal,
    };
    
    sessionStorage.setItem("despesaParams",JSON.stringify(params));

    this.despesas$ = this.service.listPage(params).pipe(
      tap(x => {
        this.config.totalItems = x['totalElements']        
      })
    )

    this.getTotals(params);    
  } 

  onDateFilter() {
    this.alertService.modalDateFilter(this.dtInicial, this.dtFinal)
      .pipe(
        take(1),
        filter(result => !!result)
      )
      .subscribe(result => {
        this.dtInicial = result.dtInicial;
        this.dtFinal = result.dtFinal;
        this.onRefresh();
    });    
  } 

  onPrev(){
    this.updateDates(this.dtInicial, -1)
    this.onRefresh();
  }

  onNext(){
    this.updateDates(this.dtFinal, 1)
    this.onRefresh();
  }

  updateDates(date: String, month: number){    
    var dataAtual = new Date(date.substring(0,10)), y = dataAtual.getUTCFullYear(), m = dataAtual.getUTCMonth() + month;        
    this.dtInicial = new Date(y, m, 1).toISOString().substring(0,10);
    this.dtFinal = new Date(y, m + 1, 0).toISOString().substring(0,10);
  }

  onClear(){
    sessionStorage.removeItem("despesaParams")
    this.updateDates(new Date().toISOString(), 0)
    this.searchtext = ""
    this.config.currentPage = 1
    this.onRefresh()
  }

  getTotals(params){    
    this.service.getTotals(params).subscribe(
      success => {
        this.total = success['total'],
        this.totalPago = success['totalPago'],
        this.totalPendente = success['totalPendente']
      }
    );   
  }
}
