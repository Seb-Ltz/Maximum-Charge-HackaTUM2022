import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeatmapService {
  constructor(private http: HttpClient) {}

  getHeatMapData(): Observable<Array<number[]>> {
    return this.http
      .get<any[]>('./assets/DE_charger.json')
      .pipe(
        map((data) => data.map((point) => [point.Latitude, point.Longitude]))
      );
  }
}
