import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  GeocodingFeatureModel,
  GeocodingResponseModel,
} from '../models/geocoding-response.model';
import { filter, map, Observable, of, tap } from 'rxjs';
import { PopulationResponseModel } from '../models/population-response.model';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  currentLocation?: GeocodingFeatureModel;

  get lat(): number {
    return this.currentLocation!.geometry.coordinates[1];
  }

  get lng(): number {
    return this.currentLocation!.geometry.coordinates[0];
  }

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

  getPopulation(
    lat: number,
    lng: number,
    radius: number
  ): Observable<PopulationResponseModel> {
    // return this.http.get<PopulationResponseModel>(
    //   `https://jl6n621bs2.execute-api.eu-central-1.amazonaws.com/prod/ajax/ww-data/find-population-inside-radius?lat=47.520398&lng=2.938972&radius=278.3174798192204`
    // );
    // return this.http.get<any>(
    //   `https://ringpopulationsapi.azurewebsites.net/api/globalringpopulations?latitude=47.506069781910846&longitude=2.9882812500000004&distance_km=407`
    // );
    //
    return of({
      population: radius >= 300 ? 45636445 : 19290555,
      radius: radius,
      year: 2015,
    });
  }
}
