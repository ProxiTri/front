import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private http : HttpClient) { }

  getExample(){
    return new Promise((resolve,reject) => {
      this.http.get('https://jsonplaceholder.typicode.com/todos/1',{}).subscribe(data => {
        resolve(data);
      });
    });
  }
}
