import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';
import { ElectricRangeMapComponent } from './electric-range-map/electric-range-map.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { StackedChartComponent } from './charts/stacked-chart/stacked-chart.component';
import { AreaChartModule, NgxChartsModule } from '@swimlane/ngx-charts';
import { HighchartsChartModule } from 'highcharts-angular';
import { SavingsChartComponent } from './charts/savings-chart/savings-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeatMapComponent,
    FooterComponent,
    ElectricRangeMapComponent,
    SearchBarComponent,
    StackedChartComponent,
    SavingsChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    LeafletModule,
    MatIconModule,
    HttpClientModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    HighchartsChartModule,
    NgxChartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
