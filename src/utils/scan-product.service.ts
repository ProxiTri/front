import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ScanProductService {

  constructor(private http: HttpClient) { }

  getProduct(code: string) {
    return this.http.get<any>('https://world.openfoodfacts.org/api/v2/search?code=' + code, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',

      })
    });
  }
}
