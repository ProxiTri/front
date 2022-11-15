import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    mail: new FormControl(''),
    password: new FormControl('')
  });
  data?: any;

  constructor(private authS: AuthService) {
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.data = this.authS.loginObs(this.loginForm.value.mail, this.loginForm.value.password).subscribe((data: any) => {
      console.log(data);
    }, error => {
      console.log(error.error.message);
    });
  }
}
