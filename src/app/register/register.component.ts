import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    mail: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private authS: AuthService) {
  }

  ngOnInit(): void {
  }

  submitForm() {
    this.authS.register(this.registerForm.value.mail, this.registerForm.value.password);
  }
}
