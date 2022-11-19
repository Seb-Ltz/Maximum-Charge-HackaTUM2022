import { Component, OnInit } from '@angular/core';
import { LatLngExpression, LeafletMouseEvent, MapOptions } from 'leaflet';
import * as L from 'leaflet';
import { ElectricRangeService } from '../shared/services/electric-range.service';

@Component({
  selector: 'app-electric-range-map',
  templateUrl: './electric-range-map.component.html',
  styleUrls: ['./electric-range-map.component.scss'],
})
export class ElectricRangeMapComponent implements OnInit {
  public map!: L.Map;
  public polygons: L.Polygon<any>[] = [];

  public options: MapOptions = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '',
      }),
    ],
    zoom: 12,
    center: L.latLng(48.137154, 11.576124),
  };

  constructor(private evRangeService: ElectricRangeService) {}

  ngOnInit(): void {}

  onMapReady(map: L.Map) {
    this.map = map;
  }

  onMapClick(event: LeafletMouseEvent) {
    this.evRangeService
      .getEVRangeData(event.latlng.lat, event.latlng.lng)
      .subscribe((evRangeModel) => {
        var latlngs = evRangeModel.range1;

        this.polygons.forEach((pol) => pol.remove());
        this.polygons = [];

        var polygon = L.polygon(
          latlngs.map((val) => val as LatLngExpression),
          { color: 'red' }
        ).addTo(this.map);

        this.polygons.push(polygon);

        // zoom the map to the polygon
        // this.map.fitBounds(polygon.getBounds());
      });
  }
}
