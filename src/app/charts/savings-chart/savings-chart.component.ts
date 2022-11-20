import * as Highcharts from 'highcharts';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-savings-chart',
  templateUrl: './savings-chart.component.html',
  styleUrls: ['./savings-chart.component.scss'],
})
export class SavingsChartComponent implements OnInit {
  Highcharts = Highcharts;
  linechart: any = {
    series: [
      {
        data: [1, 2, 3],
      },
    ],
    chart: {
      type: 'line',
    },
    title: {
      text: 'linechart',
    },
    credits: {
      enabled: false,
    },
  };

  ngOnInit(): void {}
}
