import { Component, OnInit } from '@angular/core';
// import Chart from 'chart.js/auto';
//or
import { Chart } from 'Chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chart: any;
  constructor() { }

  ngOnInit() {
    this.createChart();
    this.pieChart()
  }

  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['33 keshvkunj', 'Anant One', 'Cyberthunk', 'CQRA', 'Pride city'],
        datasets: [
          {
            label: "Completed Work (%)",
            data: [67, 50, 78, 45, 39],
            backgroundColor: '#007bff'
          }
        ]
      },
      options: {
        aspectRatio: 1.5
      }

    });
  }

  pieChart() {

    this.chart = new Chart("myPieChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
        datasets: [
          {
            label: 'Dataset 1',
            data: [10, 20, 30, 40, 60],
            backgroundColor: ['#dc3545', 'orange', '#ffc107', '#28a745', '#007bff'],
          }
        ]
      },
      options: {
        aspectRatio: 1.5
      }

    });
  }

  handleClick(e) {
    const a = this.chart.getElementAtEvent(e)
    console.log(a)
  }
}
