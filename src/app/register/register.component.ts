import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../../utils/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    lastname: new FormControl(''),
    name: new FormControl(''),
    mail: new FormControl(''),
    password: new FormControl('')
  })

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
    document.querySelector('.register').disabled = true
    setTimeout(() => {
      // @ts-ignore
      document.querySelector('.register').disabled = false
    }, 1500);


    this.data = this.authS.register(this.registerForm.value.mail, this.registerForm.value.password, this.registerForm.value.lastname, this.registerForm.value.name).subscribe((data: any) => {
      this.router.navigate(['/login']);
    }, (error: { error: { message: string | undefined; }; }) => {
      this.errorForm = error.error.message;
    });
  }
}
