import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl, ɵValue} from "@angular/forms";
import {catchError, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'https://api-proxitri.alexis-briet.fr/api/';
  auth_token = sessionStorage.getItem('token') || '';

  constructor(private http: HttpClient) {
  }


  login(username: ɵValue<FormControl<string | null>> | undefined, password: ɵValue<FormControl<string | null>> | undefined) {
    return this.http.post<any>(this.baseUrl + 'login', {username, password});
  }

  register(email: ɵValue<FormControl<string | null>> | undefined, password: ɵValue<FormControl<string | null>> | undefined) {
    return this.http.post<any>(this.baseUrl + 'register', {email, password})
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
      this.login('alexis.briet2003@gmail.com', 'azerty').subscribe((data: any) => {
        this.auth_token = data.token;
        resolve(data);
      }, (error) => {
        reject(error);
      })
    })
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
        if (!!curr) acc = {...acc, ...curr};
        return acc;
      }, Object.create(null));
  }

}

