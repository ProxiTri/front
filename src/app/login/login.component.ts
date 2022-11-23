import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../utils/auth.service";
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
    console.log(this.errorForm)
  }

  submitForm() {
    this.errorForm = '';
    // @ts-ignore
    document.querySelector('.login').disabled = true
    setTimeout(() => {
      // @ts-ignore
      document.querySelector('.login').disabled = false
    }, 1500);


    this.data = this.authS.login(this.loginForm.value.mail, this.loginForm.value.password).subscribe((data: any) => {
      localStorage.setItem('token', data.token);
      sessionStorage.setItem('roles', this.authS.decodeToken(data.token).roles);
      sessionStorage.setItem('username', this.authS.decodeToken(data.token).username);
      sessionStorage.setItem('id', this.authS.decodeToken(data.token).userId);
      sessionStorage.setItem('exp', this.authS.decodeToken(data.token).exp);
      this.router.navigate(['/account']);
    }, (error: { error: { message: string | undefined; }; }) => {
      this.errorForm = error.error.message;
    });
  }
}
