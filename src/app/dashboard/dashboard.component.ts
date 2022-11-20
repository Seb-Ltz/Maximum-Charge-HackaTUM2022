import { Component, OnInit } from '@angular/core';
import { LocationService } from '../shared/services/location.service';
import { Router } from '@angular/router';
import { delay, forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  currentMapDisplayed: 'heatmap' | 'rangemap' = 'heatmap';

  get lat(): number {
    return this.locationService.currentLocation!.geometry.coordinates[1];
  }

  get long(): number {
    return this.locationService.currentLocation!.geometry.coordinates[0];
  }
  constructor(
    public locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.locationService.currentLocation) {
      this.router.navigate(['/']);
    }

    forkJoin([
      this.locationService.getPopulation(this.lat, this.long, 300),
      this.locationService.getPopulation(this.lat, this.long, 200),
    ])
      .pipe(delay(10000))
      .subscribe((values) => {
        console.log(Math.abs(values[0].population - values[1].population));
      });
  }
}
