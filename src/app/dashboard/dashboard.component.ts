import { Component, OnInit } from '@angular/core';
import { LocationService } from '../shared/services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
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
  }
}
