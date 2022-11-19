import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EvRangeModel } from '../models/ev-range.model';
import { Md5 } from 'ts-md5';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ElectricRangeService {
  constructor(private http: HttpClient) {}

  /**
   * Gets electric vehicles range data from https://evnavigation.com/
   * @param lat latitude
   * @param long longitude
   */
  getEVRangeData(lat: number, long: number): Observable<EvRangeModel> {
    const testJSON = `{"Car":{"Id":69,"ChargerTypes":[1,4,6],"DesignCapacity":53.6,"Name":"Tesla Model 3 Standard Range RWD (2019)","Range":454,"FactoryRange":354,"FactoryRangeSource":"EPA","TopSpeed":200,"TotalPower":150,"Icon":"car_icon_tesla_model_3","ChargePower":11,"FastChargePower":100,"Type":"tesla","Subtype":"Model 3","VehicleType":"ECar"},"Params":{"RangeInputParams":{"batteryLevel":73,"weight":2,"tirePressure":2.3,"userBehavior":50,"speedLimiter":100,"batterySafetyLimitRha":50,"batterySafetyLimitRoute":15,"minBatteryAtDestination":10,"fastChargeLimit":90,"batterySafetyLimit":50},"TempWindParams":{"windDeg":306.44658084335737,"windSpeed":32.86659516298563,"temperature":24},"Waypoints":[{"lat":${lat},"lng":${long}}],"WindMan":0}}`;

    const base64 = btoa(testJSON);

    const checksum = Md5.hashStr(
      testJSON +
        'OLiFNGTFc5T92WNGSRgBnpcG4crUlTg7tFII0YoNZiDPJSLcnaI5sSwU4jMw5V21'
    );

    return this.http.post<EvRangeModel>(
      'https://api.evnavigation.com/api/rha',
      base64,
      {
        headers: { vqrzrxfgyhnuviru: checksum },
      }
    );
  }
}
