import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';
import { PaginationInstance } from 'ngx-pagination';
import { Observable } from 'rxjs';
import { take, tap, filter } from 'rxjs/operators';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ListDespesa } from '../despesa/despesa';
import { DespesaService } from '../despesa/despesa.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: false
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
  dtInicialBarChart: string;
  dtFinalBarChart: string;
  result: any;
  pieChart: any;
  barChart: any;

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
    private alertService: AlertModalService    
  ) { }

  ngOnInit() {
    
    this.pieChart = new Chart("pieChart",{
      type: 'doughnut',
      data:{
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: [],
          hoverOffset: 4
        }]
      },
      options:{
        maintainAspectRatio: false        
      }
    }); 

    this.barChart = new Chart("barChart", {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{              
          data: [],
          backgroundColor: 'rgba(60, 141, 188, 0.5)',          
          borderColor: 'rgba(60, 141, 188, 1)',
          borderWidth: 1          
        }]
      },
      options: {
        legend:{
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
                suggestedMin: 0,                
            }
          }],
          xAxes: [{
            maxBarThickness: 100
          }]
        },
        maintainAspectRatio: false        
      }           
    });

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

    this.updateBarChart();
    this.updatePieChart(params);

    this.getTotals(params);

    this.refreshTablePago();
    this.refreshTablePendente();
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

  onMonthFilter() {
    this.alertService.modalMonthFilter(this.dtInicialBarChart, this.dtFinalBarChart)      
      .pipe(
        take(1),
        filter(result => !!result)
      )
      .subscribe(result => {
        this.dtInicialBarChart = result.dtInicial;
        this.dtFinalBarChart = result.dtFinal;
        this.updateBarChart();
    });
  }

  updateDates(){    
    var dataAtual = new Date(), y = dataAtual.getUTCFullYear(), m = dataAtual.getUTCMonth();    
    this.dtInicial = new Date(y, m, 1).toISOString().substring(0,10);
    this.dtFinal = new Date(y, m + 1, 0).toISOString().substring(0,10);

    this.dtInicialBarChart = new Date(y, m - 10, 1).toISOString().substring(0,7)    
    this.dtFinalBarChart = new Date(y, m + 1, 1).toISOString().substring(0,7)
  }

  getTotals(params){    
    this.service.getTotals(params).subscribe(
      success => {
        this.total = success['total']
        this.totalPago = success['totalPago']
        this.totalPendente = success['totalPendente']
        this.totalPagoPercent = (this.totalPago * 100) / this.total
      }
    );   
  }

  updateBarChart(){
    this.barChart.data.labels = [];
    this.barChart.data.datasets.forEach((dataset) => {
        dataset.data = [];        
    });    
    this.barChart.update();

    let paramsBarChart = {
      dtInicial: this.dtInicialBarChart,
      dtFinal: this.dtFinalBarChart,
      search: ''
    }
    
    this.service.getTotalsByMonth(paramsBarChart).subscribe(
      success => {        
        success.forEach(res => {          
          this.barChart.data.labels.push(res.mes.toString().padStart(2,'0') + '/' + res.ano);
          this.barChart.data.datasets.forEach((dataset) => {
              dataset.data.push(res.total);              
          });          
        });                     
        this.barChart.update();        
      }
    );   
  }

  updatePieChart(params){    
    this.pieChart.data.labels = [];
    this.pieChart.data.datasets.forEach((dataset) => {
        dataset.data = [];
        dataset.backgroundColor = [];
    });    
    this.pieChart.update();
    
    this.service.getTotalsByCateg(params).subscribe(
      success => {        
        success.forEach(categ => {          
          this.pieChart.data.labels.push(categ.descricao);
          this.pieChart.data.datasets.forEach((dataset) => {
              dataset.data.push(categ.total);
              dataset.backgroundColor.push(categ.cor);
          });          
        });                     
        this.pieChart.update();        
      }
    );       
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
