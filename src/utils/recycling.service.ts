import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RecyclingService {
  baseUrl = 'https://api-proxitri.alexis-briet.fr/api/recycling_centers';
  constructor(private http: HttpClient, private authS: AuthService) {
  }

  getRecyclings(token: string) {
    return this.http.get<any>(this.baseUrl + ".json", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
  }

  getRecycling(token: string, id: number) {
    return this.http.get<any>(this.baseUrl + id +  ".json", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
  }
}

