import { Component, Input, OnInit } from '@angular/core';
import { LatLngExpression, LeafletMouseEvent, MapOptions } from 'leaflet';
import * as L from 'leaflet';
import { ElectricRangeService } from '../shared/services/electric-range.service';

@Component({
  selector: 'app-electric-range-map',
  templateUrl: './electric-range-map.component.html',
  styleUrls: ['./electric-range-map.component.scss'],
})
export class ElectricRangeMapComponent implements OnInit {
  @Input() lat!: number;
  @Input() long!: number;

  public map!: L.Map;
  public polygons: L.Polygon<any>[] = [];

  public options!: MapOptions;

  private defaultIcon = L.icon({
    iconUrl: '/assets/map-marker-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -2],
  });

  constructor(private evRangeService: ElectricRangeService) {}

  ngOnInit(): void {
    this.options = {
      layers: [
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: '',
        }),
      ],
      zoom: 12,
      center: L.latLng(this.lat, this.long),
    };
  }

  onMapReady(map: L.Map) {
    this.map = map;

    const marker = L.marker([this.lat, this.long] as LatLngExpression, {
      icon: this.defaultIcon,
    }).addTo(this.map);

    this.evRangeService
      .getEVRangeData(this.lat, this.long)
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
        this.map.fitBounds(polygon.getBounds());
      });
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
