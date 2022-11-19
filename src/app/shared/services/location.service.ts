import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GeocodingFeatureModel,
  GeocodingResponseModel,
} from '../models/geocoding-response.model';
import { filter, map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  currentLocation?: GeocodingFeatureModel;

  constructor(private http: HttpClient) {}

  search(query: string): Observable<GeocodingFeatureModel> {
    return this.http
      .get<GeocodingResponseModel>(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoidHplenFlc3RldHN0ZXN0ZXMiLCJhIjoiY2xhb2Juejk3MHh1cjNvbGJzazlseXpmYiJ9.m3vT2rhHVx6_oMd9uhYXYA`
      )
      .pipe(
        filter((res) => res.features.length > 0),
        map((res) => res.features[0]),
        tap((location) => (this.currentLocation = location))
      );
  }
}
