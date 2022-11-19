import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import 'leaflet.heat/dist/leaflet-heat.js';
import { addressPoints } from '../../assets/realworld.10000';
import { MapOptions } from 'leaflet';

@Component({
  selector: 'app-heat-map',
  templateUrl: './heat-map.component.html',
  styleUrls: ['./heat-map.component.scss'],
})
export class HeatMapComponent {
  options: MapOptions = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '',
      }),
    ],
    zoom: 12,
    center: L.latLng(-37.87, 175.475),
  };

  onMapReady(map: any) {
    let newAddressPoints = addressPoints.map(function (p) {
      return [p[0], p[1]];
    });
    const heat = (L as any).heatLayer(newAddressPoints).addTo(map);
  }
}
