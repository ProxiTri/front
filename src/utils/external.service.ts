import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExternalService {
  WEATHER_API_KEY = '256c6e2d-e90b-4449-adc0-57a4876fb7d0';

  constructor(private http: HttpClient) { }

  getAdressFromGeoPoint(lat: number, long: number) {
    return this.http.get<any>(`https://api-adresse.data.gouv.fr/reverse/?lon=${long}&lat=${lat}`);
  }

  searchAdress(adress: string) {
    return this.http.get<any>(`https://api-adresse.data.gouv.fr/search/?q=${adress}&type=&autocomplete=1`);
  }

  getWeatherFromGeoPoint(lat: number, long: number) {
    return this.http.get<any>(`https://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${long}&key=${this.WEATHER_API_KEY}`);
  }
}



