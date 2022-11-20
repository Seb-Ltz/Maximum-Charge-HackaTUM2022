import * as Highcharts from 'highcharts';
import { Component, OnInit } from '@angular/core';
import { HeatmapService } from '../../shared/services/heatmap.service';
import { LocationService } from '../../shared/services/location.service';
import { Chart, Options } from 'highcharts';

@Component({
  selector: 'app-savings-chart',
  templateUrl: './savings-chart.component.html',
  styleUrls: ['./savings-chart.component.scss'],
})
export class SavingsChartComponent implements OnInit {
  nearestChargerCoords?: number[];
  nearestChargerDist?: number; // Between 0 and 1
  dailyForeignUse = 0.2;
  chargerCost: number = 4000;

  constructor(
    private heatmapService: HeatmapService,
    private locationService: LocationService
  ) {}

  Highcharts = Highcharts;
  chartRef!: Chart;
  linechart: any = {
    series: [],
    chart: {
      type: 'line',
    },
    title: {
      text: 'CO2 reduction',
    },
    credits: {
      enabled: false,
    },
  };

  chartCallback: Highcharts.ChartCallbackFunction = (chart) => {
    this.chartRef = chart;
  };

  ngOnInit(): void {
    if (!this.locationService.lat && !this.locationService.lng) {
      return;
    }
    let nearestCharger: number[];
    let nearestChargerDist: number;
    this.heatmapService.getHeatMapData().subscribe((data) => {
      for (const individualData of data) {
        const latDist = Math.pow(
          individualData[0] - this.locationService.lat,
          2
        );
        const lngDist = Math.pow(
          individualData[1] - this.locationService.lng,
          2
        );
        const currDist = latDist + lngDist;
        if (!nearestChargerDist || nearestChargerDist > currDist) {
          nearestCharger = individualData;
          nearestChargerDist = currDist;
        }
      }
      this.nearestChargerCoords = nearestCharger;
      this.nearestChargerDist = Math.min(
        Math.sqrt(nearestChargerDist) / 0.2,
        1
      );

      this.updateChart();
    });
  }

  updateChart() {
    const co2ReductionPerKWh = Array.from(Array(10).keys()).map((year) =>
      Math.round(this.chartFunction(year)!.co2ReductionPerKWh)
    );

    const yearlyCO2Reduction = Array.from(Array(10).keys()).map((year) =>
      Math.round(this.chartFunction(year)!.yearlyCO2Reduction)
    );

    let sumYearlyCo2Reduc = [];
    for (let i = 0; i < yearlyCO2Reduction.length; i += 1) {
      let sum = 0;
      for (let j = 0; j < i; j += 1) {
        sum += yearlyCO2Reduction[j];
      }

      sumYearlyCo2Reduc.push(sum);
    }
    //
    // this.chartRef.addSeries(
    //   {
    //     type: 'line',
    //     name: 'co2ReductionPerKWh',
    //     data: co2ReductionPerKWh,
    //   },
    //   true
    // );
    this.chartRef.addSeries(
      {
        type: 'line',
        name: 'yearlyCO2Reduction',
        data: sumYearlyCo2Reduc,
      },
      true
    );

    this.chartRef.redraw();
  }

  chartFunction(t: number): {
    costReduction: number;
    preofitPerKWh: number;
    yearlyCO2Reduction: number;
    co2ReductionPerKWh: number;
  } {
    let ownsEauto = true;
    let ownsSolarPanels = true; //TODO: ADD BUTTON

    let dailyUse: number;
    if (ownsEauto) {
      dailyUse = 0.8;
      dailyUse += 0.5 * this.dailyForeignUse * this.nearestChargerDist!;
    } else {
      dailyUse = this.dailyForeignUse * this.nearestChargerDist!;
    }

    const yearlyUse = 365.0 * dailyUse;
    const yearlyKWh = dailyUse * 2250;
    const co2ReductionPerKWh = ownsSolarPanels ? 420 * (28 - t) - 50 : 0.0;
    const yearlyCO2Reduction = co2ReductionPerKWh * yearlyKWh;
    const preofitPerKWh = ownsSolarPanels ? 0.08 : 0.04;
    const costReduction = preofitPerKWh * yearlyKWh;

    return {
      costReduction,
      preofitPerKWh,
      yearlyCO2Reduction,
      co2ReductionPerKWh,
    };
  }
}
