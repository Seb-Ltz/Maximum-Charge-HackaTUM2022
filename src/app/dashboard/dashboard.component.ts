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
    this.locationService.currentLocation = {
      id: 'poi.678604846861',
      type: 'Feature',
      place_type: ['poi'],
      relevance: 1,
      properties: {
        foursquare: '4bfe36a8e9309521203462ab',
        landmark: true,
        address: '3.01 The Plaza, 535 Kings Rd.',
        category: 'design, office, design office, business, service',
      },
      text: 'Hello World Group',
      place_name:
        'Hello World Group, 3.01 The Plaza, 535 Kings Rd., London, England SW10 0SZ, United Kingdom',
      center: [-0.186274, 51.479934],
      geometry: {
        coordinates: [-0.186274, 51.479934],
        type: 'Point',
      },
      context: [
        {
          id: 'neighborhood.16944207',
          text: 'Fulham',
        },
        {
          id: 'postcode.12100939343',
          text: 'SW10 0SZ',
        },
        {
          id: 'locality.95816271',
          text: 'Kensington and Chelsea',
        },
        {
          id: 'place.6957135',
          wikidata: 'Q84',
          text: 'London',
        },
        {
          id: 'district.591439',
          wikidata: 'Q23306',
          text: 'Greater London',
        },
        {
          id: 'region.9295',
          short_code: 'GB-ENG',
          wikidata: 'Q21',
          text: 'England',
        },
        {
          id: 'country.8783',
          short_code: 'gb',
          wikidata: 'Q145',
          text: 'United Kingdom',
        },
      ],
    };

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
