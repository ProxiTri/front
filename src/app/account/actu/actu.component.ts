import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-actu',
  templateUrl: './actu.component.html',
  styleUrls: ['./actu.component.scss']
})
export class ActuComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
    console.log(sessionStorage.getItem('name'));
  }

  get() {
    return sessionStorage.getItem('firstname');
  }
}
