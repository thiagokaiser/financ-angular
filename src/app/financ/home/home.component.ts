import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  @ViewChild("barChart", { static:true }) elemento: ElementRef;

  constructor() { }

  ngOnInit() {

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

}
