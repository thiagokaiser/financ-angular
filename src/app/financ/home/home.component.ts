import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';
import { take, map, tap } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ListDespesa } from '../despesa/despesa';
import { DateFilterComponent } from '../despesa/despesa-lista/date-filter/date-filter.component';
import { DespesaService } from '../despesa/despesa.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {  

  despesasPagas$: Observable<ListDespesa>;  
  despesasPendentes$: Observable<ListDespesa>;  
  total = 0.0;
  totalPago = 0.0;
  totalPagoPercent = 0.0;
  totalPendente = 0.0;
  dtInicial: string;
  dtFinal: string;
  result: any;

  public configPendente: PaginationInstance = {
    id: 'pagPendente',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 100
  };

  public configPago: PaginationInstance = {
    id: 'pagPago',
    itemsPerPage: 10,
    currentPage: 1,
    totalItems: 100
  };

  constructor(
    private service: DespesaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.onRefresh();

  }  

  onRefresh(){
    if(this.dtInicial == undefined){
      this.updateDates()
    }

    let params = {      
      search: '',
      dtInicial: this.dtInicial,
      dtFinal: this.dtFinal,
    };

    this.barChart();
    this.pieChart();

    this.getTotals(params);

    this.refreshTablePago();
    this.refreshTablePendente();
  }

  onDateFilter() {    
    const result$ = this.modalDateFilter()    
    result$.asObservable().pipe(
      take(1),
      map(result => this.result = result)
    ).subscribe(
      success => {
        this.dtInicial = this.result.dtInicial;
        this.dtFinal = this.result.dtFinal;
        this.onRefresh();
      }
    );    
  } 

  modalDateFilter(){
    const modalRef: BsModalRef = this.modalService.show(DateFilterComponent);    
    modalRef.content.form.controls['dtInicial'].setValue(this.dtInicial);
    modalRef.content.form.controls['dtFinal'].setValue(this.dtFinal);    
    return (<DateFilterComponent>modalRef.content).confirmResult;
  }  

  updateDates(){
    
    var dataAtual = new Date(), y = dataAtual.getUTCFullYear(), m = dataAtual.getUTCMonth();    
    
    this.dtInicial = new Date(y, m, 1).toISOString().substring(0,10);
    this.dtFinal = new Date(y, m + 1, 0).toISOString().substring(0,10);
  }

  getTotals(params){    
    let totais = this.service.getTotals(params).subscribe(
      success => {
        this.total = success['total']
        this.totalPago = success['totalPago']
        this.totalPendente = success['totalPendente']
        this.totalPagoPercent = (this.totalPago * 100) / this.total
      }
    );   
  }

  barChart(){
    new Chart("barChart", {
      type: 'bar',
      data: {
          labels: ["1","2","3","4","5","6","7","8","9","10","11","12"],
          datasets: [{              
              data: [1,2,3,4,5,6,7,8,9,10,11,12],
              backgroundColor: "#3c8dbc",
              borderWidth: 1            
          }]
      },
      options: {
          legend:{
            display: false
          }
      }
    });
  }

  pieChart(){
    new Chart("pieChart",{
      type: 'doughnut',
      data:{
        labels: ['asdasdasdsad','dsdsasdasd','dasasda','asdqweqwe','asdsasdqweqw','asdasdasddd'],
        datasets:[{
          data: [1,2,3,1,2,3]        
        }]
      }
    });
  }

  refreshTablePago(){
    let params = {
      linesPerPage : '10', 
      page: this.configPago.currentPage - 1, 
      orderBy: 'dtVencimento', 
      direction : 'ASC', 
      search: '',
      dtInicial: this.dtInicial,
      dtFinal: this.dtFinal,
      pago: true
    };

    this.despesasPagas$ = this.service.listPage(params).pipe(
      tap(x => {
        this.configPago.totalItems = x['totalElements']        
      })
    )
  }

  onPageChangePago(pagina : number){    
    this.configPago.currentPage = pagina;    
    this.refreshTablePago();    
  }

  refreshTablePendente(){
    let params = {
      linesPerPage : '10', 
      page: this.configPendente.currentPage - 1, 
      orderBy: 'dtVencimento', 
      direction : 'ASC', 
      search: '',
      dtInicial: this.dtInicial,
      dtFinal: this.dtFinal,
      pago: false
    };

    this.despesasPendentes$ = this.service.listPage(params).pipe(
      tap(x => {
        this.configPendente.totalItems = x['totalElements']        
      })
    )
  }

  onPageChangePendente(pagina : number){    
    this.configPendente.currentPage = pagina;    
    this.refreshTablePendente();    
  }

  onDetalheDespesa(id){
    this.router.navigate(['/financ/despesa/detalhe', id]);    

  }

  onTodasDespesas(){
    this.router.navigate(['/financ/despesa']);    
  }

}
