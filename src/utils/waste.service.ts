import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class WasteService {
  baseUrl = 'https://api-proxitri.alexis-briet.fr/api/wastes';
  constructor(private http: HttpClient) { }

  getWastes(token: string) {
    return this.http.get<any>(this.baseUrl + ".json", {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
    });
  }
}

