import {Component, OnInit} from '@angular/core';
import {AuthService} from "../auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

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

  errorForm: string | undefined;

  constructor(private authS: AuthService, private router: Router) {
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.errorForm = '';

    this.data = this.authS.login(this.loginForm.value.mail, this.loginForm.value.password).subscribe((data: any) => {
      localStorage.setItem('token', data.token);
      sessionStorage.setItem('roles', this.authS.decodeToken(data.token).roles);
      sessionStorage.setItem('username', this.authS.decodeToken(data.token).username);
      sessionStorage.setItem('name', this.authS.decodeToken(data.token).name);
      sessionStorage.setItem('firstname', this.authS.decodeToken(data.token).firstName);
      sessionStorage.setItem('id', this.authS.decodeToken(data.token).userId);
      sessionStorage.setItem('exp', this.authS.decodeToken(data.token).exp);
      this.router.navigate(['/account']);
    }, (error: { error: { message: string | undefined; }; }) => {
      this.errorForm = error.error.message;
    });
  }
}
