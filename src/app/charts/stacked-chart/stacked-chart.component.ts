import { Component, OnInit } from '@angular/core';
import { multi } from './data';
import { Color } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-stacked-chart',
  templateUrl: './stacked-chart.component.html',
  styleUrls: ['./stacked-chart.component.scss'],
})
export class StackedChartComponent implements OnInit {
  multi?: any[];
  view: [number, number] = [550, 250];

  // options
  legend: boolean = false;
  showLabels: boolean = false;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = false;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Population';
  timeline: boolean = false;

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5'],
  } as Color;

  constructor() {
    Object.assign(this, { multi });
  }

  ngOnInit(): void {}
}
