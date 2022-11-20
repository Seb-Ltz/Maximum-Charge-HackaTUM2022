import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeatmapService {
  heatmapData?: Array<number[]>;
  constructor(private http: HttpClient) {}

  getHeatMapData(): Observable<Array<number[]>> {
    if (this.heatmapData) {
      return of(this.heatmapData);
    }

    return this.http.get<any[]>('./assets/DE_charger.json').pipe(
      map((data) => data.map((point) => [point.Latitude, point.Longitude])),
      tap((data) => (this.heatmapData = data))
    );
  }
}
