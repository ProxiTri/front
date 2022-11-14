import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl, ɵValue} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://api-proxitri.alexis-briet.fr/api/';
  constructor(private http: HttpClient) { }


  login(username: ɵValue<FormControl<string | null>> | undefined, password: ɵValue<FormControl<string | null>> | undefined) {
    return this.http.post(this.baseUrl + 'login', { username, password }).subscribe((data:any) => {
      localStorage.setItem('token', data.token);
      sessionStorage.setItem('roles', this.decodeToken(data.token).roles);
      sessionStorage.setItem('username', this.decodeToken(data.token).username);
      sessionStorage.setItem('id', this.decodeToken(data.token).userId);
      sessionStorage.setItem('exp', this.decodeToken(data.token).exp);
    });
  }

  register(email: ɵValue<FormControl<string | null>> | undefined, password: ɵValue<FormControl<string | null>> | undefined) {
    return this.http.post(this.baseUrl + 'register', { email, password }).subscribe((data:any) => {
      console.log(data)
    });
  }

  decodeToken(token: string) {
    const _decodeToken = (token: string) => {
      try {
        return JSON.parse(atob(token));
      } catch {
        return;
      }
    };
    return token
      .split('.')
      .map(token => _decodeToken(token))
      .reduce((acc, curr) => {
        if (!!curr) acc = { ...acc, ...curr };
        return acc;
      }, Object.create(null));
  }

}

