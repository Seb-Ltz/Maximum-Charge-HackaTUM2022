import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeatMapComponent } from './heat-map/heat-map.component';
import { ElectricRangeMapComponent } from './electric-range-map/electric-range-map.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

const routes: Routes = [
  { path: '', component: SearchBarComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'heatmap', component: HeatMapComponent },
  { path: 'rangemap', component: ElectricRangeMapComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
