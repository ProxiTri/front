import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  // @ts-ignore
  form: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {}

  send(): void {
    const { sujet, email, message } = this.form.value;

    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    this.http.post(
      "https://formsubmit.co/maxencelgy@gmail.com",
      { replyto: email, email: email, subject: sujet, message: message},
      { headers: headers }
    )
      .subscribe(response => {
        console.log(response);
      });


    alert(`Sujet: ${sujet}, Email: ${email}, Message: ${message}`);
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      sujet: this.formBuilder.control(null),
      email: this.formBuilder.control(null),
      message: this.formBuilder.control(null),
    });
  }
}
