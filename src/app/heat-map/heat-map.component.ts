import { Component, Input, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
import { LatLngExpression, MapOptions } from 'leaflet';
import { HeatmapService } from '../shared/services/heatmap.service';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss'],
})
export class HeatMapComponent implements OnInit {
  @Input() lat!: number;
  @Input() long!: number;

  options!: MapOptions;
  map!: L.Map;
  defaultIcon = L.icon({
    iconUrl: '/assets/map-marker-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -2],
  });

  constructor(private heatmapService: HeatmapService) {}

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
    // let newAddressPoints = addressPoints.map(function (p) {
    //   return [p[0], p[1]];
    // });

    // let newAddressPoints = DE_charger.map(function (p) {
    //   return [p.Latitude, p.Longitude];
    // });
    this.heatmapService.getHeatMapData().subscribe((addressPoints) => {
      const heat = (L as any)
        .heatLayer(addressPoints, { radius: 75 })
        .addTo(map);
    });
  }
}
