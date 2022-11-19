import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GeocodingFeatureModel,
  GeocodingResponseModel,
} from '../shared/models/geocoding-response.model';
import { filter, map } from 'rxjs';
import { LocationService } from '../shared/services/location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  searchQuery = '';

  constructor(
    private locationService: LocationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  search() {
    this.locationService
      .search(this.searchQuery)
      .subscribe((val) => this.router.navigate(['/dashboard']));
  }
}
