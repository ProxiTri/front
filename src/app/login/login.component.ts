import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authS: AuthService) { }

  ngOnInit(): void {
    this.authS.login('alexis.briet2003@gmail.com', 'azerty');
  }

}
